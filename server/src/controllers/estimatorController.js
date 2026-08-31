// Ethiopian Car Market Price Estimator algorithm
export const estimateCarPrice = (req, res, next) => {
  try {
    const { make, model, year, condition, fuelType, mileage = 0 } = req.body;

    if (!make || !year) {
      return res.status(400).json({
        success: false,
        message: "Make and Year are required for price estimation."
      });
    }

    const currentYear = 2026;
    const carYear = Number(year);
    const age = Math.max(0, currentYear - carYear);

    // Base market benchmark in ETB for Ethiopian market
    const baseMap = {
      toyota: {
        "land cruiser prado": 12000000,
        "land cruiser": 17000000,
        "corolla": 3300000,
        "vitz": 1900000,
        "yaris": 2300000,
        "rav4": 5500000,
        "hilux": 6000000,
        default: 3500000
      },
      hyundai: {
        "accent": 2900000,
        "tucson": 5200000,
        "elantra": 3400000,
        "creta": 4100000,
        default: 3200000
      },
      isuzu: {
        "d-max": 4500000,
        "fsr": 7200000,
        "npr": 5500000,
        default: 4800000
      },
      volkswagen: {
        "id.4 crozz": 5000000,
        "id.6 crozz": 6800000,
        "passat": 3900000,
        default: 4200000
      },
      suzuki: {
        "dzire": 2400000,
        "swift": 2200000,
        "alto": 1500000,
        default: 2300000
      },
      nissan: {
        "patrol": 17500000,
        "x-trail": 4600000,
        default: 4000000
      },
      byd: {
        "song plus ev": 5600000,
        "tang ev": 7500000,
        "yuan plus": 4600000,
        default: 5000000
      }
    };

    const makeKey = (make || "").toLowerCase();
    const modelKey = (model || "").toLowerCase();
    const makeGroup = baseMap[makeKey] || { default: 3000000 };
    let basePrice = makeGroup[modelKey] || makeGroup.default || 3000000;

    // Depreciation or Appreciation in Ethiopian market
    // Ethiopian market has strong currency inflation dynamics where cars hold high nominal ETB value
    let ageMultiplier = 1.0 - (age * 0.035);
    if (ageMultiplier < 0.45) ageMultiplier = 0.45;

    // Condition multiplier
    let conditionMult = 1.0;
    if (condition === "Brand New") conditionMult = 1.25;
    else if (condition === "Slightly Used") conditionMult = 1.05;
    else if (condition === "Fair") conditionMult = 0.85;

    // Fuel Type bonus (EVs have duty exemption benefits)
    let fuelMult = 1.0;
    if (fuelType === "Electric") fuelMult = 1.1;

    // Mileage deduction
    const km = Number(mileage);
    const mileageDeduction = Math.min(0.2, (km / 100000) * 0.1);

    const calculated = basePrice * ageMultiplier * conditionMult * fuelMult * (1 - mileageDeduction);
    const minEstimated = Math.round((calculated * 0.92) / 10000) * 10000;
    const maxEstimated = Math.round((calculated * 1.08) / 10000) * 10000;
    const average = Math.round(calculated / 10000) * 10000;

    res.json({
      success: true,
      data: {
        estimatedPriceETB: average,
        minEstimatedPriceETB: minEstimated,
        maxEstimatedPriceETB: maxEstimated,
        marketDemand: age <= 5 ? "High (ከፍተኛ ፍላጎት)" : "Moderate (መካከለኛ ፍላጎት)",
        recommendedCustomsNote: fuelType === "Electric" ? "Duty-Free EV policy applies (ከቀረጥ ነፃ)" : "Standard Customs Tariff (ቀረጥ የሚከፈልበት)",
        locationBenchmark: "Bole Rwanda & Addis Ababa Market Benchmark"
      }
    });
  } catch (error) {
    next(error);
  }
};
