function audioSwitch(switchSelector, sizeSwitch, switchOrientation) {
  var sizeSwitch = sizeSwitch;
  var switchArea = $(switchSelector);
  var switchHandle = $(switchSelector + " .handle");

  var switchLabel = $(switchSelector + " .audio-toggle-label");
  var axis = switchOrientation;

  if (switchOrientation == "y") {
    var animationStartCords = { top: 0 };
    var animationEndCords = { top: -sizeSwitch + "px" };
    var relPos = "top";
  }

  if (switchOrientation == "x") {
    animationStartCords = { left: 0 };
    animationEndCords = { left: sizeSwitch + "px" };
    relPos = "left";
  }

  switchHandle.draggable({
    axis: axis,
    containment: "parent",
    stop: function () {
      conditionMove();
    },
  });

  switchArea.click(function () {
    conditionMoveSnap();
  });

  function conditionMove() {
    if (switchOrientation == "x") {
      if (parseInt(switchHandle.css(relPos)) <= sizeSwitch / 2) {
        switchHandle.animate(animationStartCords, 100, function () {
          // audio stop
          var audio = document.getElementById("audio");
          audio.pause();
          switchHandle.removeClass("active").text("OFF");
          switchLabel.fadeIn("fast");
        });
      } else {
        switchHandle.animate(animationEndCords, 100, function () {
          // audio play
          var audio = document.getElementById("audio");
          audio.play();
          switchHandle.addClass("active").text("ON");
          switchLabel.fadeOut("fast");
        });
      }
    } else {
      if (parseInt(switchHandle.css(relPos)) >= -sizeSwitch / 2) {
        switchHandle.animate(animationStartCords, 100, function () {
          // audio stop
          var audio = document.getElementById("audio");
          audio.pause();
          switchHandle.removeClass("active").text("OFF");
          switchLabel.fadeIn("fast");
        });
      } else {
        switchHandle.animate(animationEndCords, 100, function () {
          // audio play
          var audio = document.getElementById("audio");
          audio.play();
          switchHandle.addClass("active").text("ON");
          switchLabel.fadeOut("fast");
        });
      }
    }
  }

  function conditionMoveSnap() {
    if (switchOrientation == "y") {
      sizeSwitch = -sizeSwitch;
    }

    if (parseInt(switchHandle.css(relPos)) == sizeSwitch) {
      switchHandle.animate(animationStartCords, 100, function () {
        // audio stop
        var audio = document.getElementById("audio");
        audio.pause();
        switchHandle.removeClass("active").text("OFF");
        switchLabel.fadeIn("fast");
      });
    } else {
      switchHandle.animate(animationEndCords, 100, function () {
        // audio play
        var audio = document.getElementById("audio");
        switchHandle.addClass("active").text("ON");
        audio.play();
        switchLabel.fadeOut("fast");
      });
    }
  }
}

audioSwitch("#switch", 160, "y");

audioSwitch("#switch2", 285, "x");
