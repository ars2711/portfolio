from flask import Flask, render_template, send_from_directory
import os
import markdown2

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/projects')
def projects():
    return render_template('projects.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/fun')
def fun():
    return render_template('fun.html')


@app.route('/testimonials')
def testimonials():
    return render_template('testimonials.html')

@app.route('/gallery')
def gallery():
    return render_template('gallery.html')

@app.route('/skills')
def skills():
    return render_template('skills.html')

@app.route('/download/<path:filename>')
def download_file(filename):
    return send_from_directory('static/documents', filename, as_attachment=True)


# FAQ
@app.route('/faq')
def faq():
    return render_template('faq.html')

# Games
@app.route('/games')
def games():
    return render_template('games.html')

# Blog index
@app.route('/blog')
def blog():
    posts = []
    blog_dir = os.path.join(app.root_path, 'blog_posts')
    for fname in os.listdir(blog_dir):
        if fname.endswith('.md'):
            with open(os.path.join(blog_dir, fname), encoding='utf-8') as f:
                content = f.read()
                meta, body = content.split('---', 2)[1:]
                meta_lines = meta.strip().split('\n')
                meta_dict = {k.strip(): v.strip() for k, v in (line.split(':', 1) for line in meta_lines if ':' in line)}
                summary = meta_dict.get('summary', '')
                posts.append({
                    'title': meta_dict.get('title', fname),
                    'date': meta_dict.get('date', ''),
                    'summary': summary,
                    'slug': fname[:-3]
                })
    posts.sort(key=lambda x: x['date'], reverse=True)
    return render_template('blog.html', posts=posts)

# Blog post detail
@app.route('/blog/<slug>')
def blog_post(slug):
    path = os.path.join(app.root_path, 'blog_posts', slug + '.md')
    if not os.path.exists(path):
        return render_template('404.html'), 404
    with open(path, encoding='utf-8') as f:
        content = f.read()
        meta, body = content.split('---', 2)[1:]
        meta_lines = meta.strip().split('\n')
        meta_dict = {k.strip(): v.strip() for k, v in (line.split(':', 1) for line in meta_lines if ':' in line)}
        html = markdown2.markdown(body)
        return render_template('blog_post.html', post={
            'title': meta_dict.get('title', slug),
            'date': meta_dict.get('date', ''),
            'content': html
        })

# 404 handler
@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

# --- Main Application Setup ---
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
