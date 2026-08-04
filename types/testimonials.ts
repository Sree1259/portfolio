export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatarUrl?: string;
}

export interface TestimonialsData {
  enabled: boolean;
  testimonials: Testimonial[];
}
