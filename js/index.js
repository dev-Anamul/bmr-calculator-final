// ! get the button here
const impericalButton = document.getElementById('imperical');
const metricButton = document.getElementById('metric');
const modalBody = document.getElementById('modal__body');

// ! get the form here
const impericalForm = document.getElementById('imperical__form');
const metricForm = document.getElementById('metric__form');

impericalButton.addEventListener('click', () => {
  impericalForm.classList.remove('hidden');
  metricForm.classList.add('hidden');
  impericalButton.classList.add('active');
  metricButton.classList.remove('active');
});

metricButton.addEventListener('click', () => {
  metricForm.classList.remove('hidden');
  impericalForm.classList.add('hidden');
  metricButton.classList.add('active');
  impericalButton.classList.remove('active');
});

// ! form functionality here
const showAlert = (className, message) => {
  return `<div class="alert alert-${className} input_alert" role="alert">${message}</div>`;
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
    <div class="card">
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
    <div class="card mt-3">
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
const mbrFunction = (weight, height, age, gender, activity) => {
  let renderedHtml = '';

  if (!weight || !height || !age || !gender || !activity) {
    const msg =
      'Please fillup all the fields.Because, we sufficient data to calculate your requirement....<br>Thank You..';
    renderedHtml = showAlert('danger', msg);
  }

  if (Number.isNaN(height) || Number.isNaN(weight) || Number.isNaN(age)) {
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

  return renderedHtml;
};

// Todo imperical form functionality
impericalForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // ! get all the necessary inputs here
  const weightFounds = document.getElementById('imperical__weight').value;
  const heightFeet = document.getElementById('imperical__height__feet').value;
  const heightInch =
    document.getElementById('imperical__height__inches').value || 0;
  const age = document.getElementById('imperical__age').value;
  const gender = document.querySelector(
    'input[name="imperical__gender"]:checked'
  ).value;

  const activity = document.getElementById('imperical__activity').value;

  // ! empty input checking
  if (!heightFeet || !age || !weightFounds) {
    const msg =
      'Please fillup all the fields.Because, we sufficient data to calculate your requirement....<br>Thank You..';
    modalBody.innerHTML = showAlert('danger', msg);
  } else if (
    // ! check if the input is not a number
    Number.isNaN(parseFloat(heightFeet)) ||
    Number.isNaN(parseFloat(weightFounds)) ||
    Number.isNaN(parseFloat(age)) ||
    Number.isNaN(parseFloat(heightInch))
  ) {
    const msg =
      'Your data is not valid.Please Provide valid data....<br>Thank You..';
    modalBody.innerHTML = showAlert('danger', msg);
  } else {
    // ! convert found to kg
    const weightKg = Math.round(weightFounds * 0.453592);

    // ! convert feet inch to cm
    const heightCm = Math.round(
      (heightFeet * 12 + parseFloat(heightInch)) * 2.54
    );

    // ! call the final bmr function here
    modalBody.innerHTML = mbrFunction(
      weightKg,
      heightCm,
      age,
      gender,
      activity
    );
  }
});

// Todo metric form's funtionality
metricForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // ! gell all the necessary data here
  const weightKG = document.getElementById('metric__weight').value;
  const heightCM = document.getElementById('metric__height').value;
  const age = parseFloat(document.getElementById('metric__age').value);
  const gender = document.querySelector(
    'input[name="metric__gender"]:checked'
  ).value;
  const activity = parseFloat(document.getElementById('activity').value);

  if (!weightKG || !heightCM || !age) {
    const msg =
      'Please fillup all the fields.Because, we sufficient data to calculate your requirement....<br>Thank You..';
    modalBody.innerHTML = showAlert('danger', msg);
  } else if (
    // ! check if the input is not a number
    Number.isNaN(parseFloat(weightKG)) ||
    Number.isNaN(parseFloat(heightCM)) ||
    Number.isNaN(parseFloat(age))
  ) {
    const msg =
      'Your data is not valid.Please Provide valid data....<br>Thank You..';
    modalBody.innerHTML = showAlert('danger', msg);
  } else {
    const weightNumber = parseFloat(weightKG);
    const heightNumber = Math.round(parseFloat(heightCM));

    // ! call the final bmr function here
    modalBody.innerHTML = mbrFunction(
      weightNumber,
      heightNumber,
      age,
      gender,
      activity
    );
  }
});
