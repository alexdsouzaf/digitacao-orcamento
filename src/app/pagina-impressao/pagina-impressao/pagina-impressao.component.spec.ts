import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaImpressaoComponent } from './pagina-impressao.component';

describe('PaginaImpressaoComponent', () => {
  let component: PaginaImpressaoComponent;
  let fixture: ComponentFixture<PaginaImpressaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaImpressaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaImpressaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
