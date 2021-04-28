class Snow {
  constructor(windowWidth = window.innerWidth, maxSize = 3.0, minSize = 1.0, maxHeight = -20, minHeight = -1) {
    this.size = this.random(maxSize, minSize);
    this.x = this.random(parseInt(windowWidth) + 100, -100);
    this.y = this.random(maxHeight, minHeight);

    this.fallSpeed = 0.0;
    this.windPeek = 0.0;
  }

  random = (max, min) => Math.floor(Math.random() * (max - min + 1)) + min;
  randomFloat = (max, min) => Math.random() * (max - min + 1) + min;

  changePeek() {
    const snowMaxBlow = 2;
    // generating 2 random liczbas and plusing and minusing them to windPeek to achive 'random' peek
    if (this.windPeek < snowMaxBlow) this.windPeek += Math.sin(this.randomFloat(0.0, 0.5));
    if (this.windPeek > -snowMaxBlow) this.windPeek -= Math.sin(this.randomFloat(0.0, 0.5));
    //Nie ma tutaj else if'a z powodu, że chce osiągnąć by śnieżki losowo zmieniały swój kierunek
    //tzn. z 1 ifa możemy wylosować sin(0.2), a z drugiego sin(0.5) przez co w wyniku
    //działań otrzymamy losowy kierunek poruszania się kulki (w tym przypadku)
    //zmniejszy się on o ~0.2, czyli kulka albo poruszy się w lewo szybciej
    //albo zwolni gdyby poruszała się w prawą stronę.
    //Piszę, gdyż miałem zrefaktoryzować ten fragment kodu, lecz CHYBA nie jest to odpowiednie w moim zamyśle.
  }

  changeFallSpeed() {
    const maxFallSpeed = this.size + 1;
    if (this.fallSpeed < maxFallSpeed) this.fallSpeed += this.randomFloat(0.0, 1.0);
    if (this.fallSpeed > -maxFallSpeed / 2) this.fallSpeed -= this.randomFloat(0.0, 0.2);
    // Analogicznie jak wyżej.
  }
}
