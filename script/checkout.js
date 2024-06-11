
      // Current year
      document.querySelector("[currentYear]").textContent =
        new Date().getUTCFullYear();
      // Counter
      window.onload = () => {
        document.querySelector("[counter]").textContent = JSON.parse(
          localStorage.getItem("checkout")
        )
          ? JSON.parse(localStorage.getItem("checkout")).length
          : 0;
      };

      //js for checkout