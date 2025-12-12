// 
// src/modules/welcome/WelcomeController.ts

import { WelcomeModel } from "./WelcomeModel";

export class WelcomeController {
  private navigation: any;
  private model: WelcomeModel;
  private t: (key: string) => string;

  constructor(navigation: any, t: (key: string) => string) {
    this.navigation = navigation;
    this.t = t;
    this.model = new WelcomeModel();
  }

  handleContinue = () => {
    this.navigation.navigate("StartJourney");
  };

  getWelcomeMessageParts() {
    const message = this.t("welcomeMessage");
    return this.model.splitByKavigai(message);
  }

  getTeamMessageParts() {
    const message = this.t("teamMessage");
    return this.model.splitByKavigai(message);
  }
}
