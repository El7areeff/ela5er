import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyALuBhkoIbeXUuyr-RjXRSzTE7SiIwUWeY",
    authDomain: "activation-system-39498.firebaseapp.com",
    databaseURL: "https://activation-system-39498-default-rtdb.firebaseio.com",
    projectId: "activation-system-39498",
    storageBucket: "activation-system-39498.appspot.com",
    messagingSenderId: "432065749491",
    appId: "1:432065749491:web:6b02b7e3a72d8113807286"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// ✅ إخفاء شاشة التحميل بعد 10 ثواني وإظهار صفحة تسجيل الدخول
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        console.log("✅ إخفاء شاشة التحميل...");
        document.getElementById("loading-screen").style.opacity = "0";

        setTimeout(() => {
            document.getElementById("loading-screen").style.display = "none";
            console.log("✅ عرض صفحة تسجيل الدخول...");

            const loginScreen = document.getElementById("main-content");
            loginScreen.style.display = "flex";

            setTimeout(() => {
                loginScreen.style.opacity = "1";
            }, 100);
        }, 500);
    }, 10000); // ✅ التحميل لمدة 10 ثواني ثم إظهار صفحة تسجيل الدخول
});

// ✅ زر التحقق من كود التفعيل
document.getElementById("verifyButton").addEventListener("click", function () {
    const codeInput = document.getElementById("activationCode").value.trim();
    const selectedLogo = document.querySelector('input[name="logo"]:checked');
    const message = document.getElementById("message");

    if (!selectedLogo || !codeInput) {
        message.innerText = "⚠️ الرجاء اختيار اللوجو وإدخال كود التفعيل.";
        message.style.color = "red";
        return;
    }

    console.log("🔍 جاري التحقق من كود التفعيل...");

    get(child(ref(database), `codes/${codeInput}`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log("✅ كود صحيح، تحويل المستخدم إلى el7areeff.github.io/tsgeleld5ol1/...");
            window.location.href = "https://el7areeff.github.io/tsgeleld5ol1/"; // ✅ تأكد إن الرابط مكتوب بشكل صحيح
        } else {
            message.innerText = "❌ كود غير صالح!";
            message.style.color = "red";
        }
    }).catch(() => {
        message.innerText = "⚠️ حدث خطأ أثناء الاتصال بالخادم.";
        message.style.color = "red";
    });
});
