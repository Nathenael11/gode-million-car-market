import { memoryStore } from "../utils/memoryStore.js";

// @desc Get all cars with filtering, search, sorting
// @route GET /api/cars
export const getCars = async (req, res, next) => {
  try {
    const cars = memoryStore.getAllCars(req.query);
    res.json({
      success: true,
      count: cars.length,
      data: cars
    });
  } catch (error) {
    next(error);
  }
};

// @desc Get single car by ID
// @route GET /api/cars/:id
export const getCarById = async (req, res, next) => {
  try {
    const car = memoryStore.getCarById(req.params.id);
    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car listing not found"
      });
    }
    res.json({
      success: true,
      data: car
    });
  } catch (error) {
    next(error);
  }
};

// @desc Create new car listing
// @route POST /api/cars
export const createCar = async (req, res, next) => {
  try {
    const {
      title,
      titleAm,
      make,
      model,
      year,
      price,
      priceNegotiable = true,
      condition = "Brand New",
      conditionAm,
      bodyType = "Sedan",
      fuelType = "Petrol",
      fuelTypeAm,
      transmission = "Automatic",
      transmissionAm,
      mileage = 0,
      engineCapacity,
      color,
      colorAm,
      interiorColor,
      doors = 4,
      seats = 5,
      location = "Bole Rwanda, Addis Ababa",
      locationAm = "ቦሌ ሩዋንዳ፣ አዲስ አበባ",
      customsStatus = "Duty Paid (ቀረጥ የተከፈለ)",
      plateCode = "Code 2",
      images,
      features = [],
      featuresAm = [],
      description,
      descriptionAm
    } = req.body;

    if (!title || !make || !model || !year || !price) {
      return res.status(400).json({
        success: false,
        message: "Title, Make, Model, Year, and Price in ETB are required."
      });
    }

    const defaultImages = [
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80"
    ];

    const car = memoryStore.createCar({
      title,
      titleAm: titleAm || title,
      make,
      model,
      year: Number(year),
      price: Number(price),
      priceNegotiable: Boolean(priceNegotiable),
      condition,
      conditionAm: conditionAm || (condition === "Brand New" ? "አዲስ (ዜሮ ኪ.ሜ)" : "ጥሩ ይዞታ ላይ ያለ"),
      bodyType,
      fuelType,
      fuelTypeAm: fuelTypeAm || (fuelType === "Electric" ? "ኤሌክትሪክ (EV)" : fuelType === "Diesel" ? "ናፍጣ (Diesel)" : "ቤንዚን (Petrol)"),
      transmission,
      transmissionAm: transmissionAm || (transmission === "Automatic" ? "ኦቶማቲክ" : "ማኑዋል"),
      mileage: Number(mileage),
      engineCapacity: engineCapacity || "2.0L",
      color: color || "Black",
      colorAm: colorAm || "ጥቁር",
      interiorColor: interiorColor || "Leather",
      doors: Number(doors),
      seats: Number(seats),
      location,
      locationAm,
      customsStatus,
      plateCode,
      isFeatured: false,
      isComingSoon: false,
      isInspectionVerified: true,
      images: (images && images.length > 0) ? images : defaultImages,
      features: features.length > 0 ? features : ["Air Conditioning", "Power Windows", "Bluetooth Audio"],
      featuresAm: featuresAm.length > 0 ? featuresAm : ["የአየር ማቀዝቀዣ (AC)", "የኤሌክትሪክ መስኮቶች", "ብሉቱዝ"],
      description: description || `Excellent ${year} ${make} ${model} available at Gode & Million Car Market in Bole Rwanda.`,
      descriptionAm: descriptionAm || `ምርጥ ${year} ${make} ${model} በጎዴ እና ሚሊየን የመኪና መሸጫ ቦሌ ሩዋንዳ የቀረበ።`,
      seller: {
        id: req.user.id,
        name: req.user.name,
        nameAm: req.user.nameAm || req.user.name,
        phone: req.user.phone,
        whatsapp: req.user.phone.replace(/[\s+-]/g, ""),
        telegram: "godemillion_cars",
        location: `${req.user.subCity || "Bole Rwanda"}, Addis Ababa`
      }
    });

    res.status(201).json({
      success: true,
      message: "Car listing published successfully!",
      data: car
    });
  } catch (error) {
    next(error);
  }
};

// @desc Update car listing
// @route PUT /api/cars/:id
export const updateCar = async (req, res, next) => {
  try {
    const car = memoryStore.getCarById(req.params.id);
    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found"
      });
    }

    if (req.user.role !== "admin" && car.seller && car.seller.id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this listing."
      });
    }

    const updatedCar = memoryStore.updateCar(req.params.id, req.body);
    res.json({
      success: true,
      message: "Listing updated successfully.",
      data: updatedCar
    });
  } catch (error) {
    next(error);
  }
};

// @desc Delete car listing
// @route DELETE /api/cars/:id
export const deleteCar = async (req, res, next) => {
  try {
    const car = memoryStore.getCarById(req.params.id);
    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found"
      });
    }

    if (req.user.role !== "admin" && car.seller && car.seller.id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this listing."
      });
    }

    memoryStore.deleteCar(req.params.id);
    res.json({
      success: true,
      message: "Car listing removed successfully."
    });
  } catch (error) {
    next(error);
  }
};
