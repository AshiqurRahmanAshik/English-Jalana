const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayLessons(data.data));
};
const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn");
  lessonButtons.forEach((btn) => btn.classList.remove("active"));
};
const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      clickBtn.classList.add("active");
      displayLevelWords(data.data);
    });
};
const displayLevelWords = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  if (words.length == 0) {
    wordContainer.innerHTML = `
<div class="text-center col-span-full space-y-2">
         <img src="./assets/alert-error.png" alt="" class="mx-auto">
        <p class="font-bangla text-xl">এখানে কোনো lesson Add করা হয়নি ।</p>
        <p class="font-bangla font-bold md:text-3xl">
          Next Lesson এ যান ।
        </p>
      </div>
   `;
    return;
  }
  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
    <div
        class="bg-white rounded-xl shadow-sm text-center p-10 space-y-2"
      >
        <h2 class="font-bold text-xl">${
          word.word ? word.word : "শব্দ পাওয়া যায়নি"
        }</h2>
        <p>Meaning/Pronunciation</p>
        <p class="font-bangla font-bold text-2xl">"${
          word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"
        } / ${
      word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায়নি"
    }"</p>
        <div class="flex justify-between items-center">
          <button onclick="loadWordDetail(${
            word.id
          })" class="bg-sky-100 hover:bg-sky-200 rounded p-2">
            <i class="fa-solid fa-circle-info"></i>
          </button>
          <button onclick="my_modal_5.showModal()" class="bg-sky-100 hover:bg-sky-200 rounded p-2">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>
    `;
    wordContainer.append(card);
  });
};
const loadWordDetail = (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  console.log(url);
};
const displayLessons = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  for (let lesson of lessons) {
    // console.log(lesson);
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
                 <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"
                    ><i class="fa-solid fa-book"></i>Lesson-${lesson.level_no}
                    </button>
    `;
    levelContainer.append(btnDiv);
  }
};
loadLessons();
