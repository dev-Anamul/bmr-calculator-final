const showAlert = (className, message) => {
  return `<div class="alert alert-${className} alert-dismissible fade show" role="alert">
  ${message}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
      </button>
      </div>`;
};

const showHtml = (
  caloriesLoaseFat,
  targetCalories,
  caloriesGainMucle,
  minimunProtein,
  generallyProtein,
  maximumProtein
) => {
  return `<div>
    <div class="card my-3">
      <div class="card-body">
        <h5 class="card-title">Your Daily Calories Target For :</h5>
        <p
          class="card-text d-flex justify-content-between px-5 border p-2"
        >
          <span class="fw-bold">Lose Fat : </span>
          <span>${caloriesLoaseFat}</span>
        </p>
        <p
          class="card-text d-flex justify-content-between px-5 border p-2"
        >
          <span class="fw-bold">Maintain Weight : </span>
          <span>${targetCalories}</span>
        </p>
        <p
          class="card-text d-flex justify-content-between px-5 border p-2"
        >
          <span class="fw-bold">Gain Muscle : </span>
          <span>${caloriesGainMucle}</span>
        </p>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Your Daily Protein Target</h5>
        <p
          class="card-text d-flex justify-content-between px-5 border p-2"
        >
          <span class="fw-bold">Minimum Protein : </span>
          <span>${minimunProtein}g</span>
        </p>
        <p
          class="card-text d-flex justify-content-between px-5 border p-2"
        >
          <span class="fw-bold">Recommended Protein : </span>
          <span>${generallyProtein}g</span>
        </p>
        <p
          class="card-text d-flex justify-content-between px-5 border p-2"
        >
          <span class="fw-bold">Maximum Protein : </span>
          <span>${maximumProtein}g</span>
        </p>
      </div>
    </div>
  </div>`;
};

const maleBMR = (weight, height, age, activity) => {
  //! benedict formula
  // For men: BMR = 66.5 + (13.75 * weight in kg) + (5.003 * height in cm) - (6.75 * age)
  //   const BMR = 66.5 + 13.75 * weight + 5.003 * height - 6.75 * age;

  //! muffin formula
  //   BMR (kcal / day) = 10 * weight (kg) + 6.25 * height (cm) – 5 * age (y) + 5 (kcal / day)

  // ! calculate the calories
  const BMR = 10 * weight + 6.25 * height - 5 * age + 5;
  const targetCalories = Math.round(BMR * activity);
  const caloriesLoaseFat = Math.round(targetCalories * 0.9);
  const caloriesGainMucle = Math.round(targetCalories * 1.26);

  // ! calculate protein
  const weightInPound = Math.round(weight * 2.20462);
  const minimunProtein = Math.round(weightInPound * 0.72);
  const generallyProtein = Math.round(weightInPound * 1);
  const maximumProtein = Math.round(weightInPound * 1.5);

  // ! return ready html
  return showHtml(
    caloriesLoaseFat,
    targetCalories,
    caloriesGainMucle,
    minimunProtein,
    generallyProtein,
    maximumProtein
  );
};

const femaleBMR = (weight, height, age, activity) => {
  // ! benedict formula
  // For women: BMR = 655.1 + (9.563 * weight in kg) + (1.850 * height in cm) - (4.676 * age)
  //   const BMR = 655.1 + 9.563 * weight + 1.85 * height - 4.676 * age;

  // ! muffin formula
  //   BMR (kcal / day)= 10 * weight (kg) + 6.25 * height (cm) – 5 * age (y) – 161 (kcal / day)

  //! calory calculation
  const BMR = 10 * weight + 6.25 * height - 5 * age - 161;
  const targetCalories = Math.round(BMR * activity);
  const caloriesLoaseFat = Math.round(targetCalories * 0.9);
  const caloriesGainMucle = Math.round(targetCalories * 1.26);

  // ! protein calculation
  const weightInPound = Math.round(weight * 2.20462);
  const minimunProtein = Math.round(weightInPound * 0.72);
  const generallyProtein = Math.round(weightInPound);
  const maximumProtein = Math.round(weightInPound * 1.5);

  // ! return ready html
  return showHtml(
    caloriesLoaseFat,
    targetCalories,
    caloriesGainMucle,
    minimunProtein,
    generallyProtein,
    maximumProtein
  );
};

// ! function to check NaN
const isNaN = (x) => x !== x;

// ! final bmr funtion
const mbrFunction = (weight, height, age, gender, activity, renderDiv) => {
  let renderedHtml = '';

  if (!weight || !height || !age || !gender || !activity) {
    const msg =
      'Please fillup all the fields.Because, we sufficient data to calculate your requirement....<br>Thank You..';
    renderedHtml = showAlert('danger', msg);
  }

  if (isNaN(height) || isNaN(weight) || isNaN(age)) {
    const msg =
      'Your data is not valid.Please Provide valid data....<br>Thank You..';
    renderedHtml = showAlert('danger', msg);
  }

  if (gender === 'male') {
    renderedHtml = maleBMR(weight, height, age, activity);
  }

  if (gender === 'female') {
    renderedHtml = femaleBMR(weight, height, age, activity);
  }

  renderDiv.innerHTML = renderedHtml;
};

module.exports = mbrFunction;
