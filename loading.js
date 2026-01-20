    function goToIndex() {
      window.location.href = "trangchu.html";
    }

    // Tự động sau 10s
    const timer = setTimeout(goToIndex, 10000);

    // Nếu người dùng click bất kỳ đâu, chuyển ngay
    document.body.addEventListener("click", () => {
      clearTimeout(timer); // huỷ timeout nếu bấm sớm
      goToIndex();
    });


