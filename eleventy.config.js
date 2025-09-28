module.exports = function(eleventyConfig) {
  // Set the input directory to 'src'
  return {
    dir: {
      input: "src",
      output: "_site"
    },
    
    // CRITICAL FIX: Explicitly set template engines to avoid filter conflicts
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "liquid",
    dataTemplateEngine: "liquid"
  };
};