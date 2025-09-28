module.exports = function(eleventyConfig) {
  // Set the input directory to 'src' and output to '_site'
  eleventyConfig.dir = {
    input: "src",
    output: "_site"
  };

  // CRITICAL FIX: Tell the Liquid engine to allow the 'safe' filter
  // The 'safest' option includes the 'safe' filter, which prevents 
  // auto-escaping of HTML in the output.
  eleventyConfig.setLiquidOptions({
    jsTruthy: true,
    strictFilters: false,
    strictVariables: false,
    // This line specifically enables the 'safe' filter
    safest: true 
  });

  return eleventyConfig;
};