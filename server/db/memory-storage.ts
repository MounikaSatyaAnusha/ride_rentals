interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  createdAt: Date;
}

interface Vehicle {
  _id: string;
  name: string;
  category: string;
  model: string;
  year: number;
  pricePerDay: number;
  transmission?: string;
  fuelType?: string;
  seats?: number;
  description?: string;
  features?: string[];
  imageUrl: string;
  available: boolean;
  createdAt: Date;
}

interface Driver {
  _id: string;
  name: string;
  experienceYears: number;
  rating: number;
  languages: string[];
  specialty: string;
  licenseNumber: string;
  pricePerDay: number;
  imageUrl?: string;
  available: boolean;
  createdAt: Date;
}

interface Booking {
  _id: string;
  userId: string;
  vehicleId: string;
  driverId?: string;
  startDate: Date;
  endDate: Date;
  totalDays: number;
  vehicleCost: number;
  driverCost: number;
  totalCost: number;
  status: string;
  createdAt: Date;
}

interface ContactSubmission {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
}

class MemoryStorage {
  private users: Map<string, User> = new Map();
  private vehicles: Map<string, Vehicle> = new Map();
  private drivers: Map<string, Driver> = new Map();
  private bookings: Map<string, Booking> = new Map();
  private contacts: Map<string, ContactSubmission> = new Map();
  private idCounter = 0;

  generateId(): string {
    return `mem_${++this.idCounter}_${Date.now()}`;
  }

  User = {
    create: async (data: Omit<User, "_id" | "createdAt">): Promise<any> => {
      const user: User = {
        _id: this.generateId(),
        ...data,
        createdAt: new Date(),
      };
      this.users.set(user._id, user);
      return { ...user, toObject: () => user };
    },

    findOne: async (query: any): Promise<any> => {
      const users = Array.from(this.users.values());
      let user: User | undefined;
      if (query.$or) {
        user = users.find(u =>
          query.$or.some((condition: any) =>
            Object.entries(condition).every(([key, value]) => u[key as keyof User] === value)
          )
        );
      } else {
        user = users.find(u =>
          Object.entries(query).every(([key, value]) => u[key as keyof User] === value)
        );
      }
      return user ? { ...user, toObject: () => user } : null;
    },

    findById: async (id: string): Promise<User | null> => {
      return this.users.get(id) || null;
    },
  };

  Vehicle = {
    insertMany: async (data: any[]): Promise<any[]> => {
      return data.map(item => {
        const vehicle: Vehicle = {
          _id: this.generateId(),
          ...item,
          createdAt: new Date(),
        };
        this.vehicles.set(vehicle._id, vehicle);
        return { ...vehicle, toObject: () => vehicle };
      });
    },

    find: async (query: any = {}): Promise<any[]> => {
      const vehicles = Array.from(this.vehicles.values());
      const filtered = Object.keys(query).length === 0 
        ? vehicles 
        : vehicles.filter(v =>
            Object.entries(query).every(([key, value]) => v[key as keyof Vehicle] === value)
          );
      return filtered.map(v => ({ ...v, toObject: () => v }));
    },

    findById: async (id: string): Promise<any> => {
      const vehicle = this.vehicles.get(id);
      return vehicle ? { ...vehicle, toObject: () => vehicle } : null;
    },

    countDocuments: async (): Promise<number> => {
      return this.vehicles.size;
    },
  };

  Driver = {
    insertMany: async (data: any[]): Promise<any[]> => {
      return data.map(item => {
        const driver: Driver = {
          _id: this.generateId(),
          ...item,
          createdAt: new Date(),
        };
        this.drivers.set(driver._id, driver);
        return { ...driver, toObject: () => driver };
      });
    },

    find: async (query: any = {}): Promise<any[]> => {
      const drivers = Array.from(this.drivers.values());
      const filtered = Object.keys(query).length === 0 
        ? drivers 
        : drivers.filter(d =>
            Object.entries(query).every(([key, value]) => d[key as keyof Driver] === value)
          );
      return filtered.map(d => ({ ...d, toObject: () => d }));
    },

    findById: async (id: string): Promise<any> => {
      const driver = this.drivers.get(id);
      return driver ? { ...driver, toObject: () => driver } : null;
    },

    countDocuments: async (): Promise<number> => {
      return this.drivers.size;
    },
  };

  Booking = {
    create: async (data: Omit<Booking, "_id" | "createdAt">): Promise<any> => {
      const booking: Booking = {
        _id: this.generateId(),
        ...data,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        createdAt: new Date(),
      };
      this.bookings.set(booking._id, booking);
      return { ...booking, toObject: () => booking };
    },

    find: async (query: any): Promise<any[]> => {
      const bookings = Array.from(this.bookings.values());
      const filtered = bookings.filter(b =>
        Object.entries(query).every(([key, value]) => b[key as keyof Booking] === value)
      );
      return filtered.map(b => ({ ...b, toObject: () => b }));
    },

    findById: async (id: string): Promise<any> => {
      const booking = this.bookings.get(id);
      return booking ? { ...booking, toObject: () => booking } : null;
    },
  };

  ContactSubmission = {
    create: async (data: Omit<ContactSubmission, "_id" | "createdAt">): Promise<any> => {
      const contact: ContactSubmission = {
        _id: this.generateId(),
        ...data,
        createdAt: new Date(),
      };
      this.contacts.set(contact._id, contact);
      return { ...contact, toObject: () => contact };
    },
  };
}

export const memoryStorage = new MemoryStorage();
export { type User, type Vehicle, type Driver, type Booking, type ContactSubmission };
