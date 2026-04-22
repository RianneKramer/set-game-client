import { Component, computed, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() cardId!: number;

  shapeMap = ['golf', 'ovaal', 'ruit'];
  fillMap = ['halfvol', 'leeg', 'vol'];
  colorMap = ['groen', 'paars', 'rood'];

  get props() {
    return {
      count: (this.cardId % 3) + 1,
      shape: Math.floor(this.cardId / 3) % 3,
      fill: Math.floor(this.cardId / 9) % 3,
      color: Math.floor(this.cardId / 27) % 3,
    };
  }

  getArray(n: number) {
    return Array.from({ length: n });
  }

  imagePath = computed(() => {
    return 'images/' + this.shapeMap[this.props.shape] + '_' + this.fillMap[this.props.fill] + '_' + this.colorMap[this.props.color] + '.png';
  });
}
