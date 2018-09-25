class View {
  constructor(game, $el) {
    this.game = game;
    this.el = $el;
    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    const $lists = $('li');
    $lists.on('click', e => {
      let $listEl = $(e.target);
      if ($listEl.hasClass('clicked')) {
        alert('Invalid move');
      }
      // console.log("this", $(e.target));
      let posArray = $listEl.data("pos");
      this.game.playMove(posArray);
      this.makeMove($listEl);
      if (this.game.isOver()) {
        // debugger
        if (this.game.winner()) {
          let loserIcon = this.game.winner();
          let winnerIcon = this.game.currentPlayer;
          let $lostSquares = $(`li:contains(${loserIcon})`);
          let $wonSquares = $(`li:contains(${winnerIcon})`);
          $lostSquares.addClass('lost');
          $wonSquares.addClass('won');
          this.el.append(`<p>congrats, <strong>${winnerIcon}</strong>, you won!</p>`);
        } else {
          $('li').addClass('lost');
          this.el.append(`<p>it's a draw!</p>`);
        }
        $lists.addClass('nohover');
        $lists.off('click');
      }
    });
  }

  makeMove($square) {
    const mark = this.game.currentPlayer;
    // console.log("mark", mark);
    $square.text(mark);
    $square.addClass("clicked");
  }

  setupBoard() {
    const ul = ("<ul></ul>");
    this.el.append(ul);
    const $grid = $('ul');

    let count = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        $grid.append('<li></li>');
        let $listEl = $('li').eq(count);
        $listEl.data("pos", [i, j]);
        count++;
      }
    }
  }
}

module.exports = View;
