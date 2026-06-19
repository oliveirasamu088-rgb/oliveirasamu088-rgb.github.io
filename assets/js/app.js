(function () {
    var loaded = false;

    function loadAnalytics() {
        if (loaded) return;
        loaded = true;

        ['scroll', 'click', 'touchstart', 'mousemove', 'keydown'].forEach(function (e) {
            window.removeEventListener(e, loadAnalytics);
        });

        (function () {
            var s = document.createElement('script');
            s.async = true;
            s.src = 'https://www.googletagmanager.com/gtag/js?id=G-L4VX98GW06';
            document.head.appendChild(s);

            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', 'G-L4VX98GW06');
        })();
        
        (function () {
            var s = document.createElement('script');
            s.async = true;
            s.setAttribute('data-id', '101415475');
            s.src = 'https://static.getclicky.com/js';
            document.head.appendChild(s);
        })();
    }

    ['scroll', 'click', 'touchstart', 'mousemove', 'keydown'].forEach(function (e) {
        window.addEventListener(e, loadAnalytics, { passive: true });
    });
})();

document.addEventListener('alpine:init', () => {
    if (!Alpine.store('theme')) {
        Alpine.store('theme', {
            init() {
                const savedTheme = localStorage.getItem('theme');
                const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                this.theme = savedTheme || systemTheme || 'dark';
                this.updateTheme();
            },
            theme: 'dark',
            toggle() {
                this.theme = this.theme === 'light' ? 'dark' : 'light';
                localStorage.setItem('theme', this.theme);
                this.updateTheme();
            },
            updateTheme() {
                if (this.theme === 'dark') {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            }
        });
    }
});

(function () {
    try {
        const saved = localStorage.getItem('theme');
        const isDark = saved ? saved === 'dark' : true;
        if (isDark) {
            document.documentElement.classList.add('dark');
        }
    } catch (e) {}
})();

const postsIniciais = [
    {
        titulo: "Como estruturar seus estudos em Análise e Desenvolvimento de Sistemas",
        categoria: "ADS / Engenharia",
        imagem: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop&q=60",
        conteudo: "Para quem está entrando na área de ADS, focar em lógica de programação e algoritmos no primeiro semestre poupará muita dor de cabeça posterior. Entenda aqui a trilha ideal do Front ao Banco de Dados.",
        data: "15 Jun, 2026"
    },
    {
        titulo: "Por que o Clean Code é vital para times de tecnologia?",
        categoria: "Backend",
        imagem: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=500&auto=format&fit=crop&q=60",
        conteudo: "Escrever código que funciona é fácil, escrever código que outros desenvolvedores conseguem ler e manter é o verdadeiro desafio de engenharia de software.",
        data: "10 Jun, 2026"
    }
];

let posts = JSON.parse(localStorage.getItem('posts_blog')) || postsIniciais;

const feedArtigos = document.getElementById('feed-artigos');
const form = document.getElementById('form-novo-post');

function renderizarPosts() {
    if (!feedArtigos) return;
    feedArtigos.innerHTML = ''; 

    if (posts.length === 0) {
        feedArtigos.innerHTML = '<p class="text-muted text-center py-4">Nenhum artigo publicado ainda. Seja o primeiro!</p>';
        return;
    }

    posts.forEach((post, index) => {
        const imgCapa = post.imagem ? post.imagem : "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=600&auto=format&fit=crop";
        
        const cardHtml = `
            <div class="col">
                <div class="card blog-card p-4 text-white mb-3">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span class="badge bg-info text-dark">${post.categoria}</span>
                        <small class="text-muted">${post.data}</small>
                    </div>
                    <img src="${imgCapa}" class="img-fluid rounded mb-3" alt="${post.titulo}" style="max-height: 250px; object-fit: cover;">
                    <h3 class="fw-bold my-2">${post.titulo}</h3>
                    <p class="mb-3">${post.conteudo}</p>
                    <div class="d-flex align-items-center justify-content-between mt-2">
                        <span class="small fw-semibold">Por: Samuel de Oliveira</span>
                        <button onclick="apagarPost(${index})" class="btn btn-sm btn-outline-danger">
                            <i class="fa-solid fa-trash-can me-1"></i> Apagar
                        </button>
                    </div>
                </div>
            </div>
        `;
        feedArtigos.innerHTML += cardHtml;
    });
}

if (form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const titulo = document.getElementById('post-titulo').value;
        const categoria = document.getElementById('post-categoria').value;
        let imagem = document.getElementById('post-imagem').value;
        const conteudo = document.getElementById('post-conteudo').value;

        if (!imagem) {
            imagem = 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=600&auto=format&fit=crop';
        }

        const dataAtual = new Date().toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });

        const novoPost = { titulo, categoria, imagem, conteudo, data: dataAtual };

        posts.unshift(novoPost);
        salvarNoLocalStorage();
        renderizarPosts();
        form.reset();
    });
}

function apagarPost(indexParaRemover) {
    if (confirm("Tem certeza que deseja apagar este artigo?")) {
        posts.splice(indexParaRemover, 1);
        salvarNoLocalStorage();
        renderizarPosts();
    }
}

function salvarNoLocalStorage() {
    localStorage.setItem('posts_blog', JSON.stringify(posts));
}

renderizarPosts();