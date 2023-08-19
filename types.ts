export type ReservationType = {
  created_at: string;
  date: string;
  email: string;
  id: number;
  name: string;
  number_of_people: number;
  party_reason: string;
  phone: string;
  status: "pending" | "accepted" | "rejected";
  updated_at: string;
  user_id: number;
};

export type ReservationApiType = {
  status: string;
  data: ReservationType[];
};

export type PaginationType<TData> = {
  success: boolean;
  data: {
    current_page: number;
    data: TData[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
      url: string;
      label: string;
      active: false;
    }[];
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;
  };
  message: string;
};

export type PartyType = {
  id: number;
  theater_id: number;
  name: string;
  orchestra_name: string;
  theater_name: string;
  seats_number: number;
  booked_seats_number: number;
  seats: string;
  ticket_price: string;
  closed: number;
  date: string;
  created_at: string;
  photo: string;
  program: string;
  orchestra: string;
};

export type NewsType = {
  id: number;
  title: string;
  sub_title: string;
  text: string;
  type: string;
  image: string;
  gallery: string;
};

export type ContactType = {
  id: number;
  name: string;
  email: string;
  number: number;
  message: string;
  created_at: string;
  updated_at: string;
};

export type TheaterType = {
  id: number;
  name: string;
  seats_number: number;
  seats: string;
  image: string;
};
export type UserType = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  email_verified_at: string;
  allowed_tickets: number;
  created_at: string;
  updated_at: string;
};
