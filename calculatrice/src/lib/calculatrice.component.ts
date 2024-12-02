import { Component } from '@angular/core';

@Component({
  selector: 'app-calculatrice',
  templateUrl: './calculatrice.component.html',
  styleUrl: './calculatrice.component.scss',
})
export class CalculatriceComponent {
	
	//operations: string[] = ["Addition","Soustraction","Multiplication","Division"];
	
	touchesNumeriques: number[]= [0,1,2,3,4,5,6,7,8,9];
	
	touchesOperateurs: string[]= ["/","x","-","+"];
	
	title = "Calculatrice";
	
	parametresCalcul: Array<any> = new Array<any>();
	
	formuleAffichee: string = "...";
	
	valeurCourante: string = '';

	ok: boolean = false;
	
	enregistrerSaisie(touche: any) {
		console.log("enregistrerSaisie ", touche, "estNumérique", this.touchesNumeriques.includes(touche));
		if (this.touchesNumeriques.includes(touche)) {
			this.valeurCourante = this.valeurCourante + "" + touche;
			console.log("valeurCourante = " + this.valeurCourante);
			
			if (this.parametresCalcul.length > 0){
				this.formuleAffichee = this.formuleAffichee + touche;
			} else {
				this.formuleAffichee = this.valeurCourante;
			}
		} else {
			if(this.touchesOperateurs.includes(touche)){
				this.parametresCalcul.push(this.valeurCourante);
				this.parametresCalcul.push(touche);
				this.valeurCourante = "";
				this.formuleAffichee = this.formuleAffichee + touche;		
			}
		}
	}
	
	saisieOperandeEnCours(): boolean {
		return (this.valeurCourante == "");	
	}
	
	supprimerFormule(){
		this.formuleAffichee = "...";
		this.valeurCourante = "";
		this.parametresCalcul.splice(0,this.parametresCalcul.length);
	}
	
	obtenirResultat(){
		if (this.valeurCourante != "") {
			this.parametresCalcul.push(this.valeurCourante);			
		};
		if (this.parametresCalcul.length > 2){
			let resultat: any;
			let operateur: any;
			if (this.parametresCalcul.length < 5) {
				this.parametresCalcul.forEach(parametre => {
					if(!this.touchesOperateurs.includes(parametre)){
						let index = this.parametresCalcul.indexOf(parametre);
						if (resultat == parametre) {
							index = this.parametresCalcul.lastIndexOf(parametre);
						}
						if (index == 0){
							resultat = Number(parametre);
						} else {
							switch (operateur){
								case "+":
									resultat = resultat + Number(parametre);
								break;
								case "-":
									resultat = resultat - Number(parametre);
								break;
								case "x":
									resultat = resultat * Number(parametre);
								break;
								case "/":
									resultat = resultat / Number(parametre);
								break;																
							}		
						}	
					} else {
						operateur = parametre;
					}						
				})
			} else {
				resultat = this.prioriteOperatoire();
			}
			if (resultat !== null){
				this.formuleAffichee = resultat + "";
				this.parametresCalcul.splice(0,this.parametresCalcul.length);
				this.valeurCourante = resultat;
			}	
		}
	}

	prioriteOperatoire(): any {
		let index: any;
		let resultat: any;
		let nombre: number;
		if (this.parametresCalcul.length > 4) {
			let index2: any;
			if (this.parametresCalcul.includes("x")) {
				index = this.parametresCalcul.indexOf("x");
				let nombre2 = this.parametresCalcul[index-1];
				let nombre3 = this.parametresCalcul[index+1];
				if (this.parametresCalcul.includes("+") && index > this.parametresCalcul.indexOf("+")) {
					index2 = this.parametresCalcul.indexOf("+");
					nombre = this.parametresCalcul[index2-1];
					resultat = (Number(nombre2) * Number(nombre3)) + Number(nombre);
				}
				else if (this.parametresCalcul.includes("-") && index > this.parametresCalcul.indexOf("-")) {
					index2 = this.parametresCalcul.indexOf("-");
					nombre = this.parametresCalcul[index2-1];
					resultat = Number(nombre) - (Number(nombre2) * Number(nombre3));
				}
			} else if (this.parametresCalcul.includes("/")) {
				index = this.parametresCalcul.indexOf("/");
				let nombre2 = this.parametresCalcul[index-1];
				let nombre3 = this.parametresCalcul[index+1];
				if (this.parametresCalcul.includes("+") && index > this.parametresCalcul.indexOf("+")) {
					index2 = this.parametresCalcul.indexOf("+");
					nombre = this.parametresCalcul[index2-1];
					resultat = (Number(nombre2) / Number(nombre3)) + Number(nombre);
				}
				else if (this.parametresCalcul.includes("-") && index > this.parametresCalcul.indexOf("-")) {
					index2 = this.parametresCalcul.indexOf("-");
					nombre = this.parametresCalcul[index2-1];
					resultat = Number(nombre) - (Number(nombre2) / Number(nombre3));
				}
			}
		}
		return resultat;
	}
}