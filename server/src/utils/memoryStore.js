import { seedUsers, seedCars, seedBlogs, seedPartners, seedTestDrives, seedInquiries } from "../seed/seedData.js";

class MemoryStore {
  constructor() {
    this.users = [...seedUsers];
    this.cars = [...seedCars];
    this.blogs = [...seedBlogs];
    this.partners = [...seedPartners];
    this.testDrives = [...seedTestDrives];
    this.inquiries = [...seedInquiries];
  }

  // Users
  findUserByEmail(email) {
    return this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  findUserById(id) {
    return this.users.find(u => u.id === id);
  }

  createUser(userData) {
    const newUser = {
      id: "usr_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
      createdAt: new Date(),
      ...userData
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id, updates) {
    const idx = this.users.findIndex(u => u.id === id);
    if (idx === -1) return null;
    this.users[idx] = { ...this.users[idx], ...updates, updatedAt: new Date() };
    return this.users[idx];
  }

  deleteUser(id) {
    const idx = this.users.findIndex(u => u.id === id);
    if (idx === -1) return false;
    this.users.splice(idx, 1);
    return true;
  }

  getUsers() {
    return this.users.map(({ password, plainPassword, ...u }) => u);
  }

  // Cars
  getAllCars(filters = {}) {
    let result = [...this.cars];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(c => 
        (c.title && c.title.toLowerCase().includes(q)) ||
        (c.titleAm && c.titleAm.includes(q)) ||
        (c.make && c.make.toLowerCase().includes(q)) ||
        (c.model && c.model.toLowerCase().includes(q)) ||
        (c.location && c.location.toLowerCase().includes(q))
      );
    }

    if (filters.make && filters.make !== "all") {
      result = result.filter(c => c.make.toLowerCase() === filters.make.toLowerCase());
    }

    if (filters.bodyType && filters.bodyType !== "all") {
      result = result.filter(c => c.bodyType.toLowerCase() === filters.bodyType.toLowerCase());
    }

    if (filters.fuelType && filters.fuelType !== "all") {
      result = result.filter(c => c.fuelType.toLowerCase() === filters.fuelType.toLowerCase());
    }

    if (filters.transmission && filters.transmission !== "all") {
      result = result.filter(c => c.transmission.toLowerCase() === filters.transmission.toLowerCase());
    }

    if (filters.minPrice) {
      result = result.filter(c => c.price >= Number(filters.minPrice));
    }

    if (filters.maxPrice) {
      result = result.filter(c => c.price <= Number(filters.maxPrice));
    }

    if (filters.minYear) {
      result = result.filter(c => c.year >= Number(filters.minYear));
    }

    if (filters.maxYear) {
      result = result.filter(c => c.year <= Number(filters.maxYear));
    }

    if (filters.condition && filters.condition !== "all") {
      result = result.filter(c => c.condition.toLowerCase().includes(filters.condition.toLowerCase()));
    }

    if (filters.isFeatured === "true" || filters.isFeatured === true) {
      result = result.filter(c => c.isFeatured);
    }

    if (filters.isComingSoon === "true" || filters.isComingSoon === true) {
      result = result.filter(c => c.isComingSoon);
    }

    if (filters.sellerId) {
      result = result.filter(c => c.seller && c.seller.id === filters.sellerId);
    }

    // Sort
    if (filters.sort) {
      switch (filters.sort) {
        case "price_asc":
          result.sort((a, b) => a.price - b.price);
          break;
        case "price_desc":
          result.sort((a, b) => b.price - a.price);
          break;
        case "year_desc":
          result.sort((a, b) => b.year - a.year);
          break;
        case "mileage_asc":
          result.sort((a, b) => a.mileage - b.mileage);
          break;
        default:
          result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }
    } else {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return result;
  }

  getCarById(id) {
    const car = this.cars.find(c => c.id === id);
    if (car) {
      car.viewsCount = (car.viewsCount || 0) + 1;
    }
    return car;
  }

  createCar(carData) {
    const newCar = {
      id: "car_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
      viewsCount: 1,
      createdAt: new Date(),
      ...carData
    };
    this.cars.unshift(newCar);
    return newCar;
  }

  updateCar(id, updates) {
    const idx = this.cars.findIndex(c => c.id === id);
    if (idx === -1) return null;
    this.cars[idx] = { ...this.cars[idx], ...updates, updatedAt: new Date() };
    return this.cars[idx];
  }

  deleteCar(id) {
    const idx = this.cars.findIndex(c => c.id === id);
    if (idx === -1) return false;
    this.cars.splice(idx, 1);
    return true;
  }

  // Blogs
  getAllBlogs() {
    return [...this.blogs].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  }

  getBlogBySlug(slug) {
    return this.blogs.find(b => b.slug === slug || b.id === slug);
  }

  createBlog(blogData) {
    const newBlog = {
      id: "blog_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
      publishedAt: new Date().toISOString().split("T")[0],
      ...blogData
    };
    this.blogs.unshift(newBlog);
    return newBlog;
  }

  // Inquiries
  createInquiry(inquiryData) {
    const newInquiry = {
      id: "inq_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
      status: "Pending",
      createdAt: new Date(),
      ...inquiryData
    };
    this.inquiries.unshift(newInquiry);
    return newInquiry;
  }

  getInquiries(filters = {}) {
    let res = [...this.inquiries];
    if (filters.carId) {
      res = res.filter(i => i.carId === filters.carId);
    }
    return res;
  }

  updateInquiry(id, status) {
    const item = this.inquiries.find(i => i.id === id);
    if (item) item.status = status;
    return item;
  }

  // Test Drives
  createTestDrive(data) {
    const newTD = {
      id: "td_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
      status: "Pending Review",
      createdAt: new Date(),
      ...data
    };
    this.testDrives.unshift(newTD);
    return newTD;
  }

  getTestDrives() {
    return [...this.testDrives];
  }

  updateTestDriveStatus(id, status) {
    const item = this.testDrives.find(t => t.id === id);
    if (item) item.status = status;
    return item;
  }

  // Partners
  getPartners() {
    return [...this.partners];
  }
}

export const memoryStore = new MemoryStore();
