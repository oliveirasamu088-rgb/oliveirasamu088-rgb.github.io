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
                const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const isDark = saved ? saved === 'dark' : true;
                if (isDark) {
                    document.documentElement.classList.add('dark');
                }
            } catch (e) {}
        })();
        // Postagens iniciais padrão para o blog não iniciar vazio
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

        // Carrega as postagens salvas ou usa as iniciais
        let dbPosts = JSON.parse(localStorage.getItem('blog_posts')) || postsIniciais;

        const feedContainer = document.getElementById('feed-artigos');
        const formPost = document.getElementById('form-novo-post');

        // Função responsável por renderizar a lista de posts na tela
        function renderizarPosts() {
            feedContainer.innerHTML = ''; // Limpa o feed anterior
            
            // Renderiza do mais novo para o mais antigo (Inverso)
            dbPosts.slice().reverse().forEach((post) => {
                const imgCapa = post.imagem ? post.imagem : "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500&auto=format&fit=crop&q=60";
                
                const cardHtml = `
                    <div class="col">
                        <div class="card blog-card h-100 text-white overflow-hidden shadow-sm">
                            <div class="row g-0 h-100">
                                <div class="col-md-4">
                                    <img src="${imgCapa}" class="img-fluid h-100 w-100" style="object-fit: cover; min-height: 200px;" alt="Capa do post">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body p-4 d-flex flex-column h-100">
                                        <div class="d-flex justify-content-between align-items-center mb-2">
                                            <span class="badge" style="background-color: var(--bg-color); color: var(--primary-color); border: 1px solid var(--primary-color);">${post.categoria}</span>
                                            <small style="color: var(--text-muted);">${post.data}</small>
                                        </div>
                                        <h4 class="fw-bold card-title mb-2" style="color: var(--text-main);">${post.titulo}</h4>
                                        <p class="card-text small style-muted mb-4" style="color: var(--text-muted); flex-grow: 1;">${post.conteudo}</p>
                                        <div class="d-flex align-items-center justify-content-between mt-auto">
                                            <span class="small" style="color: var(--text-muted); font-size:0.85rem;">Por: Samuel de Oliveira</span>
                                            <a href="#" class="text-decoration-none small" style="color: var(--primary-color); font-weight:500;">Ler Post <i class="fa-solid fa-arrow-right ms-1"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                feedContainer.innerHTML += cardHtml;
            });
        }

formPost.addEventListener('submit', function(e) {
            e.preventDefault();

            const titulo = document.getElementById('post-titulo').value;
            const categoria = document.getElementById('post-categoria').value;
            const imagem = document.getElementById('post-imagem').value;
            const conteudo = document.getElementById('post-conteudo').value;

            const opcoesData = { day: 'numeric', month: 'short', year: 'numeric' };
            const hoje = new Date().toLocaleDateString('pt-BR', opcoesData);

            const novoPost = { titulo, categoria, imagem, conteudo, data: hoje };

            dbPosts.push(novoPost);
            localStorage.setItem('blog_posts', JSON.stringify(dbPosts));

            renderizarPosts();
            formPost.reset();
            alternarFormulario(); // Esconde o formulário de volta após postar
        });

        renderizarPosts(); 

        