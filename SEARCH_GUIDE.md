# 网站搜索功能使用指南 / Website Search Guide

## 中文说明

### 功能概述
我们为您的研究实验室网站添加了强大的搜索功能，让您可以快速找到所需信息。

### 如何使用
1. **打开搜索**: 点击页面右上角的🔍搜索按钮
2. **输入关键词**: 在搜索框中输入至少2个字符
3. **查看结果**: 系统会实时显示匹配的页面和内容
4. **选择结果**: 
   - 用鼠标点击任意结果
   - 或使用键盘上下箭头键选择，按回车确认
5. **关闭搜索**: 点击其他位置或按ESC键

### 搜索功能特点
- **实时搜索**: 输入时即时显示结果
- **智能匹配**: 支持关键词和短语搜索
- **高亮显示**: 搜索词在结果中高亮显示
- **键盘导航**: 支持方向键和回车键操作
- **响应式设计**: 在手机和电脑上都能正常使用

### 可搜索内容
- 所有页面标题和内容
- 研究领域关键词
- 人员信息
- 发表论文
- 新闻公告
- 教学课程
- 联系信息

### 搜索建议
- 尝试搜索: `research`, `people`, `publications`, `news`, `teaching`, `contact`
- 使用英文关键词效果更好
- 可以搜索专业术语，如 `lizard`, `behavior`, `ecology`

---

## English Instructions

### Overview
A powerful search functionality has been added to your research laboratory website for quick information retrieval.

### How to Use
1. **Open Search**: Click the 🔍 search button in the top-right corner
2. **Enter Keywords**: Type at least 2 characters in the search box
3. **View Results**: Real-time matching pages and content will be displayed
4. **Select Results**: 
   - Click any result with mouse
   - Or use keyboard arrow keys to navigate, press Enter to confirm
5. **Close Search**: Click elsewhere or press ESC key

### Search Features
- **Real-time Search**: Instant results as you type
- **Smart Matching**: Supports keyword and phrase searches
- **Highlight Display**: Search terms highlighted in results
- **Keyboard Navigation**: Arrow keys and Enter key support
- **Responsive Design**: Works on both mobile and desktop

### Searchable Content
- All page titles and content
- Research area keywords
- Personnel information
- Publications
- News announcements
- Teaching courses
- Contact information

### Search Tips
- Try searching: `research`, `people`, `publications`, `news`, `teaching`, `contact`
- English keywords work best
- Search for technical terms like `lizard`, `behavior`, `ecology`

---

## 技术实现 / Technical Implementation

### 文件结构
```
js/
└── site-search.js    # 搜索功能主文件
```

### 功能特性
- 基于JavaScript的客户端搜索
- 无需服务器端支持
- 轻量级实现，快速加载
- 支持所有现代浏览器

### 自定义搜索内容
如需添加更多搜索关键词，请编辑 `js/site-search.js` 文件中的 `keywordMaps` 对象。

### 样式自定义
搜索按钮和结果框的样式可以在 `js/site-search.js` 文件的CSS部分进行调整。
