let scrollTop = document.documentElement.scrollTop;
let secoes = document.querySelectorAll(".secao");
let navLinks = document.querySelectorAll(".nav-link");

let ultimaSecao = null;

onscroll = () => {
    const scrollTop = document.documentElement.scrollTop + 85;

    secoes.forEach(secao => {
        let secaoTop = secao.getBoundingClientRect().top + window.pageYOffset;
        let secaoBottom = secao.getBoundingClientRect().bottom + window.pageYOffset;

        if (scrollTop >= secaoTop && scrollTop <= secaoBottom) {
            if (ultimaSecao !== secao) {
                ultimaSecao = secao;

                navLinks.forEach(link => {
                    if (link.getAttribute("href").includes(secao.id)) {
                        link.classList.add("active");
                    } else {
                        link.classList.remove("active");
                    }
                });
            }
        }

        if (scrollTop < 300) {
            ultimaSecao = null;
            limparActive();
            navLinks[0].classList.add("active");
        }
    });
}

function limparActive() {
    navLinks.forEach(link => {
        link.classList.remove("active");
    });
}

navLinks.forEach(link => {
    link.onclick = (event) => {
        event.preventDefault();

        document.querySelector(".navbar-collapse").classList.remove("show");

        smoothScroll(link);
    }
})

function smoothScroll(target) {
    let targetElement = document.querySelector(`${target.href.split("/")[3]}`);
    let targetPosition = targetElement.offsetTop;
    console.log(targetElement.offsetTop)
    let startPosition = window.pageYOffset;
    let distance = targetPosition - startPosition;
    let duration = 1000;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        let timeElapsed = currentTime - startTime;
        let run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}