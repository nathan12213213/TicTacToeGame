import java.util.*;

public class TicTacToe {

  // ArrayList for playerpositions and cpuPositions
  static ArrayList <Integer> playerPositions = new ArrayList<Integer>();
  static ArrayList <Integer> cpuPositions = new ArrayList<Integer>();
  
  
	public static void main(String[] args){

    // Making the gameBoard for console
 	char[][] gameBoard = {{' ', '|', ' ', '|', ' '},
						  {'_', '+', '_', '+', '_'},
						  {' ', '|', ' ', '|', ' '},
						  {'_', '+', '_', '+', '_'},
						  {' ', '|', ' ', '|', ' '}};

		printGameBoard(gameBoard); // Prints the Gameboard above in console 

		
		while(true){ //while loop to keep game going
			
			Scanner scan = new Scanner(System.in);
			System.out.println("Where would you like play (1-9)"); // Asks user for input (1 = top left, 9 = bottom right)
			int playerPos = scan.nextInt(); // Asks user for their position
			while(playerPositions.contains(playerPos) || cpuPositions.contains(playerPositions)){ // checks if position is taken
				System.out.println("Position Taken");
				playerPos = scan.nextInt();
			}
		
			placePiece(gameBoard, playerPos, "player"); // Putting player position inputted

      String result = checkWinner(); // Checks result using checkwinner method 
       if(result.length() > 0) {
        System.out.println(result);
        break;
      }  
      
			Random rand = new Random();
			int cpuPos = rand.nextInt(9) + 1; // generates random position for cpu to place piece
			placePiece(gameBoard, cpuPos, "cpu"); // places cpu position
			while(playerPositions.contains(cpuPos) || cpuPositions.contains(cpuPos)){ // checks if position is taken
				cpuPos = rand.nextInt(9) + 1;
			}
			
			printGameBoard(gameBoard); // reprints game board

			 result = checkWinner(); // Checks result using checkwinner method  
      if(result.length() > 0) {
        System.out.println(result);
        break;
      }
		}

	}
	// printGameBoard method
   public static void printGameBoard(char[][] gameBoard){ // print game board method
	   for(char[] row : gameBoard){
		   for(char c : row){
			   System.out.print(c);
		   }
		   System.out.println();
	   }
   }

  // placePiece method 
   public static void placePiece(char[][] gameBoard, int pos, String user) {

	char symbol = ' ';
	  
	  if(user.equals("player")) {
	    symbol = 'X'; // Players use the symbol X
		playerPositions.add(pos); // Adds position inputted to the board
	  } else if(user.equals("cpu")){
	    symbol = 'O'; // Bot uses the symbol O
		cpuPositions.add(pos); // Adds position randomly to the board 
	    
	  }
	  
	  switch(pos) { // Switches position on gameboard depending on inputted position for CPU and Player
	    case 1:
	      gameBoard[0][0] = symbol;
	      break;
	      case 2:
	      gameBoard[0][2] = symbol;
	      break;
	      case 3:
	      gameBoard[0][4] = symbol;
	      break;
	      case 4:
	      gameBoard[2][0] = symbol;
	      break;
	      case 5:
	      gameBoard[2][2] = symbol;
	      break;
	      case 6:
	      gameBoard[2][4] = symbol;
	      break;
	      case 7:
	      gameBoard[4][0] = symbol;
	      break;
	      case 8:
	      gameBoard[4][2] = symbol;
	      break;
	      case 9:
	      gameBoard[4][4] = symbol;
	      break;
	    default:
	      break;
	  	}
	   }

  // Checkwinner Method
  public static String checkWinner() {
   // List of winning conditions in the gameboard
    List topRow = Arrays.asList(1,2,3);
    List midRow = Arrays.asList(4,5,6);
    List botRow = Arrays.asList(7,8,9);
    List leftCol = Arrays.asList(1,4,7);
    List midCol = Arrays.asList(2,5,8);
    List rightCol = Arrays.asList(3,6,9);
    List cross1 = Arrays.asList(1,5,9);
    List cross2 = Arrays.asList(7,5,3);

    List<List> winning = new ArrayList<List>(); // Created for ease when checking if user or cpu has won the game instead of manually listing it again one by one during a loop
    winning.add(topRow);
    winning.add(midRow);
    winning.add(botRow);
    winning.add(leftCol);
    winning.add(midCol);
    winning.add(rightCol);
    winning.add(cross1);
    winning.add(cross2);

    for(List l : winning) { // Created for loop if user or cpu has won the game or tied
      if(playerPositions.containsAll(l)) { // If player has met one of the conditions in the winning list
        return "Congratulations, you won the game!"; // Player wins 
      } else if(cpuPositions.contains(l)) { // If cpu has met one of the conditions in the winning list
        return "Damn, you lost to a bot."; // Cpu wins 
      } else if (playerPositions.size() + cpuPositions.size() == 9 ) { // If cpu and user has tied
        return "TIE!"; // Both users have tied 
      }
    }

    return "";
  }

}
