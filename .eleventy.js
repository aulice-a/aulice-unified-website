module.exports = function(eleventyConfig) {

  // Correct way to set Liquid options: Add a filter to modify the output
  eleventyConfig.addFilter("liquidSafe", function(content) {
    return content;
  });

  return {
    // Correct way to set dir options: Return the configuration object
    dir: {
      input: "src",      // Your main source folder
      includes: "_includes", // This is the default, but explicitly listing it is safe
      output: "_site"     // Your output folder
    },
    
    // Set Liquid template options
    liquidOptions: {
      jsTruthy: true,
      strictFilters: false,
      strictVariables: false,
      // The 'safest' option is a liquid-js setting, but
      // it is usually better to define a custom filter in Eleventy 
      // or ensure the 'safe' filter is being used correctly in your templates.
      // For now, let's stick to the configuration that is likely to work.
      // We will remove 'safest: true' as it is non-standard for the return object format.
    }
  };
};