import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-event-form-admin',
  templateUrl: './event-form-admin.component.html',
  styleUrls: ['./event-form-admin.component.css']
})
export class EventFormAdminComponent implements OnInit {
  eventForm!: FormGroup;
  isEditMode = false;
  eventId!: number;
  loading = false;
  errorMessage = '';

  categories: any[] = [];

  selectedFile: File | null = null;
  previewImage: string | ArrayBuffer | null = null;
  currentImage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCategories();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.eventId = +id;
      this.loadEvent(this.eventId);
    }

    this.eventForm.get('is_free')?.valueChanges.subscribe((value) => {
      const priceControl = this.eventForm.get('price');

      if (value === '1' || value === 1 || value === true) {
        priceControl?.setValue(0);
        priceControl?.clearValidators();
      } else {
        priceControl?.setValidators([Validators.required, Validators.min(0)]);
      }

      priceControl?.updateValueAndValidity();
    });
  }

  initForm(): void {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      category_id: ['', Validators.required],
      start_date: [null, Validators.required],
      end_date: [null, Validators.required],
      place: ['', Validators.required],
      capacity: ['', [Validators.required, Validators.min(1)]],
      is_free: ['1', Validators.required],
      price: [0],
      description: ['']
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (res: any[]) => {
        this.categories = res;
      },
      error: (err) => {
        console.error('Erreur chargement catégories :', err);
      }
    });
  }

  loadEvent(id: number): void {
    this.loading = true;

    this.eventService.getEventById(id).subscribe({
      next: (res: any) => {
        const event = res.event ?? res;

        this.eventForm.patchValue({
          title: event.title ?? '',
          category_id: event.category_id ?? '',
          start_date: event.start_date ? new Date(event.start_date) : null,
          end_date: event.end_date ? new Date(event.end_date) : null,
          place: event.place ?? event.location ?? '',
          capacity: event.capacity ?? '',
          is_free: String(event.is_free ?? '1'),
          price: event.price ?? 0,
          description: event.description ?? ''
        });

        if (event.image) {
          this.currentImage = `http://127.0.0.1:8000/storage/${event.image}`;
        }

        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur chargement event :', err);
        this.errorMessage = 'Impossible de charger les données de l’événement.';
        this.loading = false;
      }
    });
  }

  formatDateForLaravel(dateValue: any): string {
    if (!dateValue) return '';

    const date = new Date(dateValue);

    if (isNaN(date.getTime())) return '';

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  onFileSelected(event: any): void {
    const file = event.target.files?.[0];
    if (!file) return;

    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.previewImage = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    this.errorMessage = '';

    if (this.eventForm.invalid) {
      this.eventForm.markAllAsTouched();
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    this.loading = true;

    const formData = new FormData();
    formData.append('title', this.eventForm.value.title);
    formData.append('category_id', this.eventForm.value.category_id);
    formData.append('start_date', this.formatDateForLaravel(this.eventForm.value.start_date));
    formData.append('end_date', this.formatDateForLaravel(this.eventForm.value.end_date));
    formData.append('place', this.eventForm.value.place);
    formData.append('capacity', this.eventForm.value.capacity);
    formData.append('is_free', this.eventForm.value.is_free);
    formData.append(
      'price',
      this.eventForm.value.is_free == '1' ? '0' : String(this.eventForm.value.price ?? 0)
    );
    formData.append('description', this.eventForm.value.description ?? '');

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    const request = this.isEditMode
      ? this.eventService.updateEvent(this.eventId, formData)
      : this.eventService.createEvent(formData);

    request.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/admin/events']);
      },
      error: (err) => {
        console.error('Erreur sauvegarde :', err);
        this.loading = false;

        if (err?.error?.errors) {
          const messages = Object.values(err.error.errors).flat().join(' | ');
          this.errorMessage = messages;
        } else if (err?.error?.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'Une erreur est survenue lors de la sauvegarde.';
        }
      }
    });
  }

  get showPriceField(): boolean {
    return this.eventForm.get('is_free')?.value == '0';
  }
}