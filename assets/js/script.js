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
        document.querySelector(".navbar-collapse").classList.remove("show");
    }
})