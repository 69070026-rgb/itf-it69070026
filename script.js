/* =====================================================
   RandomBite — script.js
   สุ่มอาหาร + ดักไม่ให้สุ่มเมนูเดิมติดกัน
   ===================================================== */

"use strict";

/* ---------- ข้อมูลเมนู (10 เมนู) ---------- */
const FOODS = [
  {
    name: "พิซซ่าเปปเปอโรนี",
    category: "Italian",
    description:
      "แป้งพิซซ่าโฮมเมดอบในเตาถ่าน ราดซอสมะเขือเทศเข้มข้น ชีสมอซซาเรลลาที่ยืดเยิ้ม และเปปเปอโรนีรสเผ็ดเค็มกำลังดี",
    price: 329,
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "ชีสเบอร์เกอร์เนื้อ",
    category: "Fast Food",
    description:
      "เนื้อบดย่าง Medium-well ชุ่มฉ่ำ ประกบชีสเชดดาร์ melted ๆ ผักกาดกรอบ มะเขือเทศสด และซอสสูตรลับในขนมปังบรียอช",
    price: 189,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "ซูชิแซลมอนเซ็ต",
    category: "Japanese",
    description:
      "แซลมอนนอร์เวย์สด ๆ ตัดหนา เทียบเชฟมืออาชีพ เสิร์ฟพร้อมข้าวญี่ปุ่นปรุงรสมาสายชูรสอ่อน ๆ และวาซาบิสด",
    price: 459,
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "ราเมนกุ้งน้ำใส",
    category: "Japanese",
    description:
      "น้ำซุปไก่เคี่ยวจนหอมหวานตามธรรมชาติ เส้นราเมนนุ่มหนึบ กุ้งสดตัวโต ไข่ยางมะตูม และถั่วลันเตากรอบ",
    price: 219,
    image:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "สลัดโบลผักสด",
    category: "Healthy",
    description:
      "ผักสลัดออร์แกนิกสดกรอบ พร้อมอะโวคาโด มะเขือเทศเชอร์รี ถั่วลูกไก่ มันหวานย่าง และน้ำสลัดงาญี่ปุ่นสูตรเบา",
    price: 169,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "สเต็กเนื้อย่าง",
    category: "Steakhouse",
    description:
      "เนื้อวัวส่วน flank ย่าง Medium-rare จนหอมเกรียม เสิร์ฟพร้อมมันฝรั่งทอดกรอบ ๆ และซอสพริกไทยดำเข้มข้น",
    price: 490,
    image:
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "ผัดไทยกุ้งสด",
    category: "Thai",
    description:
      "เส้นจันท์เหนียวนุ่มผัดซอสมะขามเปรี้ยวหวาน กุ้งสดตัวโต เต้าหู้ ไข่ และถั่วงอก เสิร์ฟพร้อมมะนาวและถั่วลิสงคั่ว",
    price: 149,
    image:
      "https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "สปาเก็ตตีคาร์โบนารา",
    category: "Italian",
    description:
      "เส้นสปาเก็ตตี al dente คลุกซอสไข่แดง เปโครีโนโรมาโน และเบคอนกรอบ เสิร์ฟร้อน ๆ กลิ่นพริกไทยดำหอมฟุ้ง",
    price: 259,
    image:
      "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "แพนเค้กน้ำผึ้ง",
    category: "Dessert",
    description:
      "แพนเค้กฟู่นุ่มสามชั้น ท็อปด้วยเนยสดหอม ๆ น้ำผึ้งธรรมชาติ และผลไม้ตามฤดูกาล เหมาะกับมื้อเช้าสบาย ๆ",
    price: 139,
    image:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "ช็อกโกแลตพาร์เฟต์",
    category: "Dessert",
    description:
      "มูสช็อกโกแลตเข้มข้นสลับชั้นวิปครีมและคุกกี้ช็อกโกแลตบด ราดซอสช็อกโกแลตเยิ้ม ๆ โรยหน้าด้วยคุกกี้ทั้งชิ้น",
    price: 119,
    image:
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1200&q=80",
  },
];

/* ---------- อ้างอิง element ---------- */
const els = {
  card: document.getElementById("foodCard"),
  image: document.getElementById("foodImage"),
  name: document.getElementById("foodName"),
  desc: document.getElementById("foodDesc"),
  price: document.getElementById("foodPrice"),
  category: document.getElementById("foodCategory"),
  rollBtn: document.getElementById("randomBtn"),
  rollLabel: document.querySelector("#randomBtn .btn-label"),
  rollCount: document.getElementById("rollCount"),
  year: document.getElementById("year"),
};

/* ---------- สถานะ ---------- */
let currentIndex = -1; // ยังไม่เคยสุ่ม
let rollCount = 0;
let isRolling = false;

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/* ---------- สุ่ม index ใหม่ โดยไม่ซ้ำอันเดิมติดกัน ---------- */
function pickNextIndex() {
  if (FOODS.length <= 1) return 0;

  let next;
  do {
    next = Math.floor(Math.random() * FOODS.length);
  } while (next === currentIndex); // ดักไม่ให้ซ้ำเมนูเดิมติดกัน

  return next;
}

/* ---------- แสดงข้อมูลเมนู ---------- */
function renderFood(index) {
  const food = FOODS[index];

  // ตั้งค่า onerror ใหม่ทุกครั้ง เพื่อ fallback รูปที่โหลดไม่ขึ้น
  els.image.onerror = () => {
    els.image.onerror = null;
    els.image.src = FALLBACK_IMAGE;
  };
  els.image.src = food.image;
  els.image.alt = `รูป${food.name}`;

  els.name.textContent = food.name;
  els.desc.textContent = food.description;
  els.price.textContent = `฿${food.price.toLocaleString("th-TH")}`;
  els.category.textContent = food.category;
}

/* ---------- ฟังก์ชันสุ่มหลัก ---------- */
async function rollFood() {
  if (isRolling) return;
  isRolling = true;

  const nextIndex = pickNextIndex();

  els.rollBtn.disabled = true;
  els.rollBtn.classList.add("is-rolling");
  els.rollLabel.textContent = "กำลังสุ่ม…";
  els.card.classList.add("is-swapping");

  // ให้แอนิเมชันเฟด/เบลอทำงานก่อน แล้วค่อยเปลี่ยนข้อมูล
  await wait(320);

  renderFood(nextIndex);
  currentIndex = nextIndex;

  rollCount += 1;
  els.rollCount.textContent = rollCount;

  // รอรูปเริ่มโหลดเล็กน้อยแล้วค่อยเฟดกลับ
  await wait(80);
  els.card.classList.remove("is-swapping");

  await wait(240);
  els.rollBtn.classList.remove("is-rolling");
  els.rollBtn.disabled = false;
  els.rollLabel.textContent = "สุ่มอาหาร";
  isRolling = false;
}

/* ---------- ผูก event ---------- */
document.querySelectorAll("[data-random]").forEach((btn) => {
  btn.addEventListener("click", rollFood);
});

// กด Space เพื่อสุ่ม (ยกเว้นตอนพิมพ์ในช่อง input)
document.addEventListener("keydown", (event) => {
  const tag = document.activeElement?.tagName;
  const isTyping =
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    document.activeElement?.isContentEditable;

  if (event.code === "Space" && !isTyping) {
    event.preventDefault();
    rollFood();
  }
});

/* ---------- preload รูปทั้งหมด เพื่อให้สุ่มแล้วเปลี่ยนรูปได้ลื่น ---------- */
function preloadImages() {
  [...FOODS.map((food) => food.image), FALLBACK_IMAGE].forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

/* ---------- เริ่มต้น ---------- */
els.year.textContent = new Date().getFullYear();
preloadImages();

// เริ่มด้วยการสุ่มครั้งแรก (ไม่นับรวมในตัวนับ)
currentIndex = pickNextIndex();
renderFood(currentIndex);

// เลือกเมนู navbar ตามการคลิก
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    document
      .querySelectorAll(".nav-links a")
      .forEach((item) => item.classList.remove("is-active"));
    link.classList.add("is-active");
  });
});
