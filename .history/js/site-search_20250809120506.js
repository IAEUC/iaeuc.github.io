// 网站搜索功能
class SiteSearch {
    constructor() {
        this.searchIndex = [];
        this.isInitialized = false;
        this.init();
    }

    // 初始化搜索功能
    async init() {
        await this.buildSearchIndex();
        this.createSearchUI();
        this.bindEvents();
        this.isInitialized = true;
    }

    // 构建搜索索引
    async buildSearchIndex() {
        const pages = [
            { 
                url: 'index.html', 
                title: 'Home',
                sections: [
                    'laboratory introduction',
                    'research themes',
                    'our research',
                    'recent news'
                ]
            },
            { 
                url: 'people.html', 
                title: 'People',
                sections: [
                    'principal investigator',
                    'graduate students',
                    'undergraduate students',
                    'all people'
                ]
            },
            { 
                url: 'research.html', 
                title: 'Research',
                sections: [
                    'research projects',
                    'research areas',
                    'methodology',
                    'equipment'
                ]
            },
            { 
                url: 'publications.html', 
                title: 'Publications',
                sections: [
                    'journal articles',
                    'conference papers',
                    'book chapters',
                    'publications list'
                ]
            },
            { 
                url: 'gallery.html', 
                title: 'Gallery',
                sections: [
                    'laboratory photos',
                    'research images',
                    'team photos',
                    'equipment gallery'
                ]
            },
            { 
                url: 'news.html', 
                title: 'News',
                sections: [
                    'latest news',
                    'announcements',
                    'research updates',
                    'achievements'
                ]
            },
            { 
                url: 'teaching.html', 
                title: 'Teaching',
                sections: [
                    'courses',
                    'curriculum',
                    'student mentoring',
                    'education'
                ]
            },
            { 
                url: 'contact.html', 
                title: 'Contact',
                sections: [
                    'contact information',
                    'office hours',
                    'location',
                    'address'
                ]
            }
        ];

        // 为每个页面创建搜索索引项
        for (const page of pages) {
            try {
                const content = await this.fetchPageContent(page.url);
                this.indexPage(page, content);
            } catch (error) {
                console.warn(`Could not index page ${page.url}:`, error);
                // 如果无法获取页面内容，使用预定义的关键词
                this.indexPageKeywords(page);
            }
        }
    }

    // 获取页面内容
    async fetchPageContent(url) {
        const response = await fetch(url);
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // 移除脚本和样式标签
        const scripts = doc.querySelectorAll('script, style');
        scripts.forEach(el => el.remove());
        
        return doc.body.textContent || '';
    }

    // 索引页面内容
    indexPage(page, content) {
        const cleanContent = content.toLowerCase().replace(/\s+/g, ' ').trim();
        const words = cleanContent.split(' ').filter(word => word.length > 2);
        
        // 提取关键短语
        const sentences = cleanContent.split(/[.!?]+/);
        
        sentences.forEach((sentence, index) => {
            if (sentence.trim().length > 20) {
                this.searchIndex.push({
                    url: page.url,
                    title: page.title,
                    content: sentence.trim().substring(0, 200),
                    type: 'content',
                    relevance: 1
                });
            }
        });

        // 索引页面部分
        page.sections.forEach(section => {
            this.searchIndex.push({
                url: page.url,
                title: page.title,
                content: section,
                type: 'section',
                relevance: 2
            });
        });
    }

    // 使用预定义关键词索引页面
    indexPageKeywords(page) {
        const keywordMaps = {
            'index.html': [
                'research laboratory', 'experimental research', 'university',
                'lizard behavior', 'ecology', 'evolution', 'animal communication',
                'social behavior', 'cognition', 'field work', 'velit aliquet sagittis',
                'macquarie university', 'sydney australia', 'natural sciences',
                'behaviour ecology lizards', 'frogs cane toads', 'snakes mole-rats',
                'torresian crows turtle', 'malawi cichlids', 'australian magpies',
                'sexual selection visual chemical signals', 'social learning culture',
                'behavioural flexibility', 'kin-based family living', 'cooperation',
                'complex sociality', 'parental care', 'mechanisms sociality',
                'captive animals semi-natural conditions', 'behavioural experiments',
                'observations indoor fine-scaled study'
            ],
            'people.html': [
                'principal investigator', 'graduate students', 'undergraduate students',
                'research team', 'faculty', 'lab members', 'staff', 'research associates',
                'phd students', 'masters students', 'postdoctoral researchers',
                'visiting scholars', 'research assistants', 'laboratory personnel'
            ],
            'research.html': [
                'research projects', 'methodology', 'equipment', 'facilities',
                'experiments', 'data analysis', 'scientific methods', 'research areas',
                'laboratory techniques', 'field studies', 'behavioral research',
                'ecological studies', 'evolutionary biology', 'animal behavior',
                'research objectives', 'ongoing projects', 'research outcomes'
            ],
            'publications.html': [
                'journal articles', 'conference papers', 'publications',
                'research papers', 'scientific publications', 'peer review',
                'academic papers', 'research findings', 'scholarly articles',
                'conference proceedings', 'book chapters', 'research output',
                'publication list', 'academic publications', 'scientific literature'
            ],
            'gallery.html': [
                'laboratory photos', 'research images', 'equipment photos',
                'team photos', 'facility images', 'visual gallery', 'photo gallery',
                'research equipment', 'laboratory facilities', 'team members',
                'research activities', 'experimental setup', 'field work photos',
                'laboratory environment', 'scientific instruments'
            ],
            'news.html': [
                'latest news', 'announcements', 'research updates',
                'achievements', 'events', 'press releases', 'news updates',
                'laboratory news', 'research breakthroughs', 'academic news',
                'conference presentations', 'awards recognition', 'media coverage',
                'research highlights', 'recent developments'
            ],
            'teaching.html': [
                'courses', 'curriculum', 'education', 'student mentoring',
                'classes', 'academic programs', 'instruction', 'teaching activities',
                'course offerings', 'educational programs', 'student supervision',
                'academic courses', 'learning objectives', 'educational resources',
                'undergraduate courses', 'graduate courses'
            ],
            'contact.html': [
                'contact information', 'office hours', 'location', 'address',
                'phone', 'email', 'directions', 'map', 'contact details',
                'office location', 'postal address', 'telephone', 'contact form',
                'visiting information', 'campus location', 'laboratory address'
            ]
        };

        const keywords = keywordMaps[page.url] || [];
        keywords.forEach(keyword => {
            this.searchIndex.push({
                url: page.url,
                title: page.title,
                content: keyword,
                type: 'keyword',
                relevance: 3
            });
        });
    }

    // 创建搜索UI
    createSearchUI() {
        // 创建搜索按钮
        const searchButton = document.createElement('button');
        searchButton.id = 'search-toggle-btn';
        searchButton.innerHTML = '🔍';
        searchButton.title = 'Search';
        searchButton.style.cssText = `
            position: fixed;
            top: 20px;
            right: 30px;
            width: 50px;
            height: 50px;
            background-color: #007cba;
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            font-size: 20px;
            font-weight: bold;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            z-index: 1001;
            transition: all 0.3s ease;
        `;

        // 添加鼠标悬停效果
        searchButton.addEventListener('mouseenter', () => {
            searchButton.style.backgroundColor = '#005f8a';
            searchButton.style.transform = 'scale(1.1)';
        });
        
        searchButton.addEventListener('mouseleave', () => {
            searchButton.style.backgroundColor = '#007cba';
            searchButton.style.transform = 'scale(1)';
        });

        // 创建搜索框容器
        const searchContainer = document.createElement('div');
        searchContainer.id = 'search-container';
        searchContainer.style.cssText = `
            position: fixed;
            top: 80px;
            right: 30px;
            width: 400px;
            max-width: calc(100vw - 60px);
            background: white;
            border-radius: 10px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
            z-index: 1002;
            display: none;
            max-height: 70vh;
            overflow: hidden;
            border: 1px solid #ddd;
        `;

        // 响应式调整
        const updateSearchContainerSize = () => {
            if (window.innerWidth <= 768) {
                searchContainer.style.width = 'calc(100vw - 40px)';
                searchContainer.style.right = '20px';
                searchContainer.style.maxHeight = '60vh';
            } else {
                searchContainer.style.width = '400px';
                searchContainer.style.right = '30px';
                searchContainer.style.maxHeight = '70vh';
            }
        };

        window.addEventListener('resize', updateSearchContainerSize);
        updateSearchContainerSize();

        // 创建搜索输入框
        const searchInput = document.createElement('input');
        searchInput.id = 'search-input';
        searchInput.type = 'text';
        searchInput.placeholder = 'Search website...';
        searchInput.style.cssText = `
            width: 100%;
            padding: 15px 20px;
            border: none;
            border-radius: 10px 10px 0 0;
            font-size: 16px;
            outline: none;
            box-sizing: border-box;
        `;

        // 创建搜索结果容器
        const searchResults = document.createElement('div');
        searchResults.id = 'search-results';
        searchResults.style.cssText = `
            max-height: 400px;
            overflow-y: auto;
            border-top: 1px solid #eee;
        `;

        // 组装搜索UI
        searchContainer.appendChild(searchInput);
        searchContainer.appendChild(searchResults);
        document.body.appendChild(searchButton);
        document.body.appendChild(searchContainer);
    }

    // 绑定事件
    bindEvents() {
        const searchButton = document.getElementById('search-toggle-btn');
        const searchContainer = document.getElementById('search-container');
        const searchInput = document.getElementById('search-input');

        // 切换搜索框显示/隐藏
        searchButton.addEventListener('click', () => {
            const isVisible = searchContainer.style.display === 'block';
            if (isVisible) {
                searchContainer.style.display = 'none';
            } else {
                searchContainer.style.display = 'block';
                searchInput.focus();
            }
        });

        // 点击页面其他地方隐藏搜索框
        document.addEventListener('click', (e) => {
            if (!searchContainer.contains(e.target) && e.target !== searchButton) {
                searchContainer.style.display = 'none';
            }
        });

        // 搜索输入事件
        searchInput.addEventListener('input', (e) => {
            this.performSearch(e.target.value);
        });

        // 键盘事件
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                searchContainer.style.display = 'none';
            }
        });
    }

    // 执行搜索
    performSearch(query) {
        const searchResults = document.getElementById('search-results');
        
        if (!query || query.length < 2) {
            searchResults.innerHTML = '<div style="padding: 20px; color: #666; text-align: center;">Type at least 2 characters to search</div>';
            return;
        }

        const results = this.search(query);
        this.displayResults(results, query);
    }

    // 搜索算法
    search(query) {
        const queryLower = query.toLowerCase();
        const queryWords = queryLower.split(' ').filter(word => word.length > 1);
        
        const results = [];
        const seenUrls = new Set();

        this.searchIndex.forEach(item => {
            let score = 0;
            const contentLower = item.content.toLowerCase();
            
            // 精确匹配
            if (contentLower.includes(queryLower)) {
                score += 10;
            }

            // 单词匹配
            queryWords.forEach(word => {
                if (contentLower.includes(word)) {
                    score += 3;
                }
            });

            // 标题匹配权重更高
            if (item.title.toLowerCase().includes(queryLower)) {
                score += 15;
            }

            if (score > 0) {
                const key = `${item.url}-${item.title}`;
                if (!seenUrls.has(key)) {
                    results.push({
                        ...item,
                        score: score / item.relevance
                    });
                    seenUrls.add(key);
                }
            }
        });

        // 按分数排序并限制结果数量
        return results
            .sort((a, b) => b.score - a.score)
            .slice(0, 8);
    }

    // 显示搜索结果
    displayResults(results, query) {
        const searchResults = document.getElementById('search-results');
        
        if (results.length === 0) {
            searchResults.innerHTML = '<div style="padding: 20px; color: #666; text-align: center;">No results found</div>';
            return;
        }

        const resultsHTML = results.map(result => {
            const highlightedContent = this.highlightQuery(result.content, query);
            return `
                <div class="search-result-item" style="
                    padding: 15px 20px;
                    border-bottom: 1px solid #f0f0f0;
                    cursor: pointer;
                    transition: background-color 0.2s;
                " onmouseover="this.style.backgroundColor='#f8f9fa'" 
                   onmouseout="this.style.backgroundColor='white'"
                   onclick="window.siteSearch.navigateToResult('${result.url}')">
                    <div style="font-weight: bold; color: #007cba; margin-bottom: 5px;">
                        ${result.title}
                    </div>
                    <div style="color: #666; font-size: 14px; line-height: 1.4;">
                        ${highlightedContent}
                    </div>
                    <div style="color: #999; font-size: 12px; margin-top: 5px;">
                        ${result.url}
                    </div>
                </div>
            `;
        }).join('');

        searchResults.innerHTML = resultsHTML;
    }

    // 高亮显示查询词
    highlightQuery(text, query) {
        if (!query) return text;
        
        const queryWords = query.split(' ').filter(word => word.length > 1);
        let highlightedText = text;
        
        queryWords.forEach(word => {
            const regex = new RegExp(`(${word})`, 'gi');
            highlightedText = highlightedText.replace(regex, '<mark style="background-color: #fff3cd; padding: 1px 2px;">$1</mark>');
        });
        
        return highlightedText;
    }

    // 导航到搜索结果
    navigateToResult(url) {
        // 隐藏搜索框
        document.getElementById('search-container').style.display = 'none';
        
        // 如果是当前页面，滚动到顶部
        if (url === window.location.pathname.split('/').pop() || 
            (url === 'index.html' && window.location.pathname.endsWith('/'))) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // 导航到其他页面
            window.location.href = url;
        }
    }
}

// 全局变量
window.siteSearch = null;

// 页面加载完成后初始化搜索功能
document.addEventListener('DOMContentLoaded', () => {
    window.siteSearch = new SiteSearch();
});
