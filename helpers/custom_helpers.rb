module CustomHelpers
  def post_url(article_title)
    blog.articles.find { |article| article.title.downcase == article_title.downcase }.url
    rescue
    ""
  end
end
