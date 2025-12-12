// // src/modules/welcome/WelcomeModel.ts

// export interface WelcomeStrings {
//     welcomeMessage: string;
//     onboardMessage: string;
//     goalsMessage?: string;
//     mentorMessage?: string;
//     taglineMessage: string;
//     allTheBestMessage: string;
//     teamMessage: string;
//     continueBtn: string;
//   }
  
//   export class WelcomeModel {
//     strings: WelcomeStrings;
  
//     constructor(strings: WelcomeStrings) {
//       this.strings = strings;
//     }
  
//     /** Split welcome message on "KAVIGAI" safely */
//     getWelcomeParts(): string[] {
//       return this.strings.welcomeMessage
//         ? this.strings.welcomeMessage.split("KAVIGAI")
//         : ["Welcome"];
//     }
  
//     /** Split team message on "KAVIGAI" safely */
//     getTeamMessageParts(): string[] {
//       return this.strings.teamMessage
//         ? this.strings.teamMessage.split("KAVIGAI")
//         : ["Team"];
//     }
//   }
  

// src/modules/welcome/WelcomeModel.ts

export class WelcomeModel {
  
    splitByKavigai(message: string): string[] {
      if (!message) return [""];
      return message.split("KAVIGAI");
    }
  }
  