// My solution to Towers of Hanoi
public class TowersOfHanoiSolver {

   public static void solveTowers (int curr, String start, String aux, String end)
   {
       if (curr == 1)
       {
           System.out.println(start + " -> " + end); // Print out part of the solution
       }
       else
       {
           solveTowers(curr - 1, start, end, aux);
           System.out.println(start + " -> " + end); // Print out part of the solution
           solveTowers(curr - 1, aux, start, end);
       }
   }

   public static void main(String[] args)
   {
       // Change 4 to however many disks you want
       solveTowers(4, "A", "B", "C");
   }
}
