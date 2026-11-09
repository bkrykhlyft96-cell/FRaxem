let studentName = "";
let studentClass = "";
let currentQuestionIndex = 0;
let timerInterval;
let timeLeft = 40 * 60; // 40 دقيقة

// حفظ إجابات الطالب (مصفوفة لتخزين خيار الطالب لكل سؤال)
let userAnswers = {};

const questions = [
  {
    question:
      "1. من طرق الفحص الظاهري للحاسب، يجب التأكد من وجود وحدة الذاكرة المؤقتة في مكانها، فما هي؟",
    options: ["الرام (RAM)", "القرص الصلب", "مزود الباور", "كرت الصوت"],
    correct: 0,
  },
  {
    question: "2. تقسم الأعطال التي تصيب جهاز الحاسب إلى نوعين رئيسيين هما:",
    options: [
      "أعطال صوتية وضوئية",
      "أعطال معدات (Hardware) وبرمجيات (Software)",
      "أعطال داخلية وخارجية فقط",
      "أعطال كهربائية ويدوية",
    ],
    correct: 1,
  },
  {
    question: "3. أي مما يلي يعتبر من مسببات أعطال أجهزة الحاسب الآلي؟",
    options: [
      "التحديث المستمر للبرامج",
      "الظروف السيئة المحيطة مثل الرطوبة والغبار",
      "استخدام شاشات حديثة",
      "سرعة المعالج العالية",
    ],
    correct: 1,
  },
  {
    question:
      "4. ما هو البرنامج الذي يقوم باختبار القطع الأساسية عند بداية تشغيل الجهاز (اختبار ذاتي)؟",
    options: [
      "برنامج الـ POST",
      "برنامج Word",
      "برنامج الرسام",
      "برنامج مشغل الأغاني",
    ],
    correct: 0,
  },
  {
    question:
      "5. برنامج بسيط مُدمج داخل نظام ويندوز يُستخدم لاختبار أداء المعالج والذاكرة والقرص الصلب على مدار اليوم:",
    options: ["Task Manager", "Performance Monitor", "MSConfig", "Scandisk"],
    correct: 1,
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
  },
  {
    question: "6. ماذا تعني كلمة BIOS باختصار؟",
    options: [
      "نظام التشغيل الآلي السريع",
      "نظام الإدخال والإخراج الأساسي (Basic Input Output System)",
      "برنامج تنظيم البيانات الداخلية",
      "لوحة التحكم الرئيسية",
    ],
    correct: 1,
  },
  {
    question:
      "7. الأجزاء المكونة للكمبيوتر في الـ BIOS مقسمة إلى شقين، جزء ثابت مخزن في ROM وجزء يمكن تغييره مخزن على شريحة:",
    options: ["CMOS", "CPU", "RAM", "GPU"],
    correct: 0,
  },
  {
    question: "8. ما هي مميزات نظام UEFI مقارنة بالبيوس التقليدي (BIOS)؟",
    options: [
      "أبطأ في الإقلاع",
      "أقل أماناً",
      "يمتلك قدرة أكبر على معالجة البيانات وأكثر أماناً",
      "يدعم أقراص ذات مساحات صغيرة فقط",
    ],
    correct: 2,
  },
  {
    question:
      "9. لمعرفة ما إذا كان الحاسب يدعم نظام UEFI أو Legacy BIOS من نافذة التشغيل (Run)، ما هو الأمر الذي نكتبه؟",
    options: ["cmd", "msinfo32", "dxdiag", "control"],
    correct: 1,
  },
  {
    question:
      "10. عند الدخول إلى إعدادات الBIOS، ماذا تعني كلمة (Enable) بجانب أي إعداد؟",
    options: [
      "تعطيل وإطفاء الميزة",
      "تفعيل أو تشغيل الميزة",
      "التعرف الآلي",
      "طلب مقاطعة",
    ],
    correct: 1,
  },
  {
    question:
      "11. ظهور رسالة الخطأ التالية عند الإقلاع (CMOS battery failed) تدل على:",
    options: [
      "تلف القرص الصلب بالكامل",
      "البطارية فارغة أو بها تلف",
      "عطل في كرت الشاشة",
      "الذاكرة العشوائية ممتلئة",
    ],
    correct: 1,
  },
  {
    question:
      "12. ماذا تعني رسالة الخطأ (Memory Test Fail) التي تظهر عند التشغيل؟",
    options: [
      "مشكلة في كابل الشاشة",
      "وجود خطأ في جزء معين من الذاكرة (RAM)",
      "حرارة المعالج مرتفعة جداً",
      "النظام يعمل بشكل سليم",
    ],
    correct: 1,
  },
  {
    question:
      "13. في تشخيص أعطال كرت الشاشة (GPU)، إذا ظهرت صورة معتمة سوداء مع إضاءة الشاشة، يكون السبب غالباً:",
    options: [
      "عدم تثبيت كرت الشاشة بشكل كامل",
      "احتراق الشاشة",
      "تلف أسلاك الصوت",
      "امتلاء القرص الصلب",
    ],
    correct: 0,
    image:
      "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=600&q=80",
  },
  {
    question:
      "14. ما هو الكارت المسؤول أساساً عن إصدار وإدخال الأصوات في جهاز الحاسب الآلي؟",
    options: [
      "كرت الشاشة",
      "كرت الشبكة",
      "كرت الصوت (Sound Card)",
      "كرت التخزين",
    ],
    correct: 2,
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
  },
  {
    question:
      "15. عند سماع صفارة طويلة متبوعة بصفارتين قصيرتين عند الإقلاع، فإن ذلك يشير غالباً إلى وجود عطل في:",
    options: ["كرت الصوت", "المروحة", "الفأرة", "لوحة المفاتيح"],
    correct: 0,
  },
  {
    question:
      "16. ما هو الجزء المسؤول عن تخزين البيانات لفترة طويلة (بشكل دائم) على عكس ذاكرة التخزين المؤقت RAM؟",
    options: [
      "المعالج",
      "القرص الصلب (Hard Disk)",
      "مزود الطاقة",
      "شريحة البيوس",
    ],
    correct: 1,
    image:
      "https://images.unsplash.com/photo-1531492746302-34192b012411?auto=format&fit=crop&w=600&q=80",
  },
  {
    question:
      "17. من أعطال القرص الصلب الميكانيكية، ظهور رسالة بعد التشغيل مباشرة تعلن عن عدم وجود نظام التشغيل، والسبب غالباً:",
    options: [
      "سقوط أو تعرض الجهاز لصدمة قوية أثناء عمله",
      "تغيير لغة الويندوز",
      "ارتفاع صوت المروحة",
      "تحديث المتصفح",
    ],
    correct: 0,
  },
  {
    question:
      "18. ما هو سبب انخفاض أداء القرص الصلب وانخفاض سرعة نقل البيانات بحسب المقرر؟",
    options: [
      "كثرة عملية الفورمات بشكل متكرر",
      "تغيير مكان الكيسة",
      "فصل السماعات الخارجية",
      "تنزيل صور جديدة",
    ],
    correct: 0,
  },
  {
    question:
      "19. زر لوحة المفاتيح المستخدم عادةً للدخول إلى إعدادات الـ BIOS عند تشغيل الجهاز هو:",
    options: ["F1 أو F10", "Delete أو F2", "Esc أو Tab", "Space أو Enter"],
    correct: 1,
  },
  {
    question:
      "20. ماذا تعني عبارة (Auto) عندما نراها في إعدادات اللوحة الأم (Motherboard)؟",
    options: [
      "إيقاف الميزة نهائياً",
      "جعل اللوحة الأم تتعرف على القطعة أو الميزة بشكل آلي",
      "التحميل اليدوي الإجباري",
      "إعادة تشغيل النظام",
    ],
    correct: 1,
  },
];

function startExam() {
  studentName = document.getElementById("student-name").value.trim();
  studentClass = document.getElementById("student-class").value.trim();

  if (studentName === "" || studentClass === "") {
    alert("الرجاء إدخال اسم الطالب والفصل قبل بدء الامتحان.");
    return;
  }

  document.getElementById("student-form").style.display = "none";
  document.getElementById("quiz-screen").style.display = "block";
  startTimer();
  showQuestion();
}

function startTimer() {
  timerInterval = setInterval(() => {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    document.getElementById("timer").textContent =
      `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      alert("انتهى وقت الامتحان!");
      finishExam();
    }
    timeLeft--;
  }, 1000);
}

function showQuestion() {
  let q = questions[currentQuestionIndex];
  let container = document.getElementById("question-container");

  let html = `<h3>${q.question}</h3>`;
  if (q.image) {
    html += `<img src="${q.image}" class="question-img" alt="صورة توضيحية">`;
  }

  html += `<div class="answers-grid">`;
  q.options.forEach((opt, index) => {
    // التحقق مما إذا كانت هذه الإجابة مختارة مسبقاً من قِبل الطالب ليظل محتفظاً باختياره عند التنقل بالسابق والتالي
    let isChecked =
      userAnswers[currentQuestionIndex] === index ? "checked" : "";
    html += `
            <label class="answer-card">
                <input type="radio" name="question" value="${index}" ${isChecked}>
                <span>${opt}</span>
            </label>
        `;
  });
  html += `</div>`;

  container.innerHTML = html;

  // إظهار أو إخفاء زر "السابق"
  if (currentQuestionIndex > 0) {
    document.getElementById("prev-btn").style.display = "block";
  } else {
    document.getElementById("prev-btn").style.display = "none";
  }

  // تغيير نص زر التالي إلى "إنهاء الامتحان" في السؤال الأخير
  let nextBtn = document.getElementById("next-btn");
  if (currentQuestionIndex === questions.length - 1) {
    nextBtn.textContent = "إنهاء الامتحان";
  } else {
    nextBtn.textContent = "السؤال التالي";
  }
}

function saveCurrentAnswer() {
  let selected = document.querySelector('input[name="question"]:checked');
  if (selected) {
    userAnswers[currentQuestionIndex] = parseInt(selected.value);
  }
}

function nextQuestion() {
  let selected = document.querySelector('input[name="question"]:checked');
  if (!selected) {
    alert("الرجاء اختيار إجابة قبل الانتقال.");
    return;
  }

  saveCurrentAnswer();

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    clearInterval(timerInterval);
    finishExam();
  }
}

function prevQuestion() {
  saveCurrentAnswer(); // حفظ الإجابة الحالية قبل الرجوع
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    showQuestion();
  }
}

function finishExam() {
  document.getElementById("quiz-screen").style.display = "none";
  document.getElementById("result-screen").style.display = "block";

  // حساب الدرجة النهائية
  let score = 0;
  questions.forEach((q, index) => {
    if (userAnswers[index] === q.correct) {
      score++;
    }
  });

  let percentage = Math.round((score * 100) / questions.length);
  document.getElementById("final-score-text").innerHTML =
    `عزيزي الطالب: <b>${studentName}</b> (الفصل: ${studentClass})<br>لقد حصلت على درجة: <b>${score} من ${questions.length}</b> (${percentage}%)`;

  // عرض مراجعة الأسئلة مع تلوين المربعات (الأخضر للصحيح والأحمر للخاطئ)
  let reviewContainer = document.getElementById("review-container");
  let reviewHtml = "";

  questions.forEach((q, index) => {
    let studentChoice = userAnswers[index];
    reviewHtml += `<div class="review-question-box">`;
    reviewHtml += `<p><b>س${index + 1}: ${q.question}</b></p>`;

    q.options.forEach((opt, optIndex) => {
      let className = "review-option";
      let iconText = "";

      if (optIndex === q.correct) {
        className += " correct-answer-highlight"; // تلوين بالأخضر للإجابة الصحيحة
        iconText = " ✔️ (الإجابة الصحيحة)";
      }

      if (studentChoice === optIndex && studentChoice !== q.correct) {
        className += " wrong-answer-highlight"; // تلوين بالأحمر إذا اختار الطالب إجابة خاطئة
        iconText = " ❌ (إجابتك)";
      } else if (studentChoice === optIndex && studentChoice === q.correct) {
        iconText = " ✔️ (إجابتك الصحيحة)";
      }

      reviewHtml += `<div class="${className}">${opt} ${iconText}</div>`;
    });

    reviewHtml += `</div>`;
  });

  reviewContainer.innerHTML = reviewHtml;

  // إرسال النتيجة تلقائياً لجوجل شيت
  sendResultToGoogleSheets(score, percentage);
}

function sendResultToGoogleSheets(finalScore, percentage) {
  let scriptURL =
    "https://script.google.com/macros/s/ضع_رابط_الـ_Web_App_هنا/exec"; // ضع رابط جوجل هنا

  let form = document.createElement("form");
  form.method = "POST";
  form.action = scriptURL;
  form.target = "hidden_iframe";

  let data = {
    name: studentName,
    className: studentClass,
    score: finalScore + " من " + questions.length,
    percentage: percentage + "%",
    date: new Date().toLocaleString("ar-EG"),
  };

  for (let key in data) {
    let input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = data[key];
    form.appendChild(input);
  }

  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
}
