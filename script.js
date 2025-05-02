const gradingMode = () => document.getElementById('grading-mode').value;

const mcqData = [
  { question: 'What is the function of the uterus?', options: ['Environment for implantation', 'Egg production', 'Lubrication'], answer: 'Environment for implantation' },
  { question: 'Which part of the uterus is at the top?', options: ['Fundus', 'Cervix', 'Body'], answer: 'Fundus' },
  { question: 'Which uterine layer is made of muscle?', options: ['Myometrium', 'Endometrium', 'Peritoneum'], answer: 'Myometrium' },
  { question: 'What layer is the innermost part of the uterus?', options: ['Endometrium', 'Myometrium', 'Peritoneum'], answer: 'Endometrium' },
  { question: 'Which uterine layer has ciliated mucosa?', options: ['Endometrium', 'Myometrium', 'Peritoneum'], answer: 'Endometrium' },
  { question: 'What causes the uterus to contract after birth?', options: ['Breastfeeding', 'Ovulation', 'Stress'], answer: 'Breastfeeding' },
  { question: 'What structure picks up the egg after ovulation?', options: ['Fimbriae', 'Ovary', 'Uterine Tube'], answer: 'Fimbriae' },
  { question: 'Where does fertilization usually occur?', options: ['Uterine Tubes', 'Uterus', 'Vagina'], answer: 'Uterine Tubes' },
  { question: 'What is the function of the Greater Vestibular Gland?', options: ['Lubrication', 'Hormone secretion', 'Egg release'], answer: 'Lubrication' },
  { question: 'Which part of the vulva is known for protection?', options: ['Labia Majora', 'Clitoris', 'Hymen'], answer: 'Labia Majora' },
  { question: 'Which part of the female anatomy is muscular and 3.5 inches long?', options: ['Vagina', 'Uterine Tube', 'Urethra'], answer: 'Vagina' },
  { question: 'What hormone does the corpus luteum produce?', options: ['Progesterone', 'Estrogen', 'Testosterone'], answer: 'Progesterone' },
  { question: 'How many eggs are generally released per cycle?', options: ['1', '5', '10'], answer: '1' },
  { question: 'What can negatively affect ovulation?', options: ['Stress', 'Hydration', 'Vitamin C'], answer: 'Stress' },
  { question: 'What structure contains the blood supply of the ovary?', options: ['Medulla', 'Cortex', 'Fimbriae'], answer: 'Medulla' },
  { question: 'What is a function of the ovary?', options: ['Release eggs', 'Fertilize eggs', 'Store sperm'], answer: 'Release eggs' },
  { question: 'Which female structure has mucin rivers to aid sperm travel?', options: ['Cervix', 'Ovary', 'Urethra'], answer: 'Cervix' },
  { question: 'What is the purpose of the ciliated mucosa in the uterus?', options: ['Move mucus', 'Protect the ovary', 'Create hormones'], answer: 'Move mucus' },
  { question: 'What is the outermost layer of the uterus called?', options: ['Peritoneum', 'Myometrium', 'Endometrium'], answer: 'Peritoneum' },
  { question: 'What does peristaltic action in the uterus help with?', options: ['Moving the egg', 'Fertilizing the egg', 'Producing hormones'], answer: 'Moving the egg' },
  { question: 'The uterus has three layers: peritoneum, myometrium, and endometrium.', options: ['True', 'False'], answer: 'True' },
 { question: 'The cervix is located at the top of the uterus.', options: ['True', 'False'], answer: 'False' },
 { question: 'Breastfeeding causes the uterus to contract and shrink.', options: ['True', 'False'], answer: 'True' },
 { question: 'The myometrium contains three types of muscle layers.', options: ['True', 'False'], answer: 'True' },
 { question: 'The fimbriae are responsible for nourishing the fetus.', options: ['True', 'False'], answer: 'False' },
 { question: 'Mucin rivers in the cervix help guide semen toward the egg.', options: ['True', 'False'], answer: 'True' },
 { question: 'The vagina has a lot of nerve endings throughout.', options: ['True', 'False'], answer: 'False' },
 { question: 'The ovary creates and secretes hormones like progesterone.', options: ['True', 'False'], answer: 'True' },
 { question: 'Peristaltic movement in the uterus helps move the fetus.', options: ['True', 'False'], answer: 'False' },
 { question: 'Smoking can damage the ciliated mucosa in both the lungs and uterus.', options: ['True', 'False'], answer: 'True' },
 { question: 'Ovulation occurs during days 1–5 of the menstrual cycle.', options: ['True', 'False'], answer: 'False' },
 { question: 'Extreme physical activity and low body fat can stop ovulation.', options: ['True', 'False'], answer: 'True' },
 { question: 'The labia minora are always smaller than the labia majora.', options: ['True', 'False'], answer: 'False' }

];
// --- Render Functions ---
const toggleBtn = document.getElementById("toggle-image-btn");
const diagramImg = document.getElementById("diagram-img");

toggleBtn.addEventListener("click", () => {
  if (diagramImg.src.includes("anatomydiagram.png")) {
    diagramImg.src = "answerkey.png";
    toggleBtn.textContent = "Show Diagram";
  } else {
    diagramImg.src = "anatomydiagram.png";
    toggleBtn.textContent = "Show Answer Key";
  }
});


function renderMCQ() {
  const section = document.getElementById('mcq-section');
  mcqData.forEach((item, index) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'mcq-block';
    wrapper.innerHTML = `<div>${item.question}</div>`;
    item.options.forEach(option => {
      const label = document.createElement('label');
      label.innerHTML = `
        <input type="radio" name="mcq-${index}" value="${option}" />
        ${option}
      `;
      label.querySelector('input').onchange = (e) => {
        if (gradingMode() === 'instant') checkMCQ(index);
      };
      wrapper.appendChild(label);
    });
    section.appendChild(wrapper);
  });
}

function checkMCQ(index) {
  const selected = document.querySelector(`input[name="mcq-${index}"]:checked`);
  if (!selected) return;
  const correct = mcqData[index].answer;
  selected.parentElement.classList.toggle('correct', selected.value === correct);
  selected.parentElement.classList.toggle('wrong', selected.value !== correct);
}

// --- Grading ---
function gradeQuiz() {
  if (gradingMode() === 'instant') return;

    document.querySelectorAll('.free-input').forEach(input => checkFreeText(input));
  mcqData.forEach((_, i) => checkMCQ(i));
}

// --- Init ---


renderMCQ();
