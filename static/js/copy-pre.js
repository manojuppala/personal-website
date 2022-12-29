function copytext(copyText) {
  const textArea = document.createElement("textarea");
  textArea.textContent = copyText.trim();
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  // Consider: visually indicate success... (see example below)
  textArea.parentNode.removeChild(textArea);
}

jQuery(document).ready(function ($) {
  var copyid = 0;

  $("pre").each(function () {
    copyid++;
    $(this).attr("id", copyid).wrap('<div class="pre-wrapper"/>');
    $(this).parent().css("margin", $(this).css("margin"));
    $('<button class="copy-snippet"><i class="fa fa-clone"></i> Copy</button>')
      .attr(
        "onclick",
        "copytext(document.getElementById(" + copyid + ").textContent)"
      )
      .insertAfter($(this))
      .data("copytarget", copyid);
  });

  $("body").on("click", ".copy-snippet", function (ev) {
    ev.preventDefault();

    var $copyButton = $(this);

    $pre = $(document).find("pre[id=" + $copyButton.data("copytarget") + "]");
    if ($pre.length) {
      var textArea = document.createElement("textarea");

      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        $copyButton.text("Copied!").prop("disabled", true);
      } catch (err) {
        $copyButton.text("FAILED: Could not copy").prop("disabled", true);
      }
      setTimeout(function () {
        $copyButton
          .html("<i class='fa fa-clone'></i> Copy")
          .prop("disabled", false);
      }, 3000);
      textArea.parentNode.removeChild(textArea);
    }
  });
});
