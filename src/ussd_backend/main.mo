import List "mo:base/List";
import Option "mo:base/Option";
import Trie "mo:base/Trie";
import Nat32 "mo:base/Nat32";
import Text "mo:base/Text";

actor Medical {
  // Set up storage.
  // The type of a medicine identifier.
  public type MedicineID = Nat32;


   // Create a trie key from a medicine identifier.
  private func key(x : MedicineID) : Trie.Key<MedicineID> {
    return { hash = x; key = x };
  };

   // Create a code key from a medicine identifier.
 

  // The type of a Medicine.
  public type Medicine = {
    name : Text;
    code : Nat32;
    manufacturedDate : Text;  // Corrected spelling
    expiryDate : Text;
    status: Nat32;
    usages : List.List<Text>;
  };

  // The next available medicine identifier.
  private stable var next : MedicineID = 0;

  // The medicine data store.
  private stable var medicines : Trie.Trie<MedicineID, Medicine> = Trie.empty();

  // Create a medicine.
  public func createMedicine(medicine : Medicine) : async MedicineID {
    let medId = next;
    next += 1;

    // Use a pattern match to replace the medicine in the Trie.
    medicines := Trie.replace(
      medicines,
      key(medicine.code),
      Nat32.equal,
      ?medicine,  // Use ? to indicate an Option type
    ).0;

    return medId;
  };

  //get the medical record 
  //get the medical record 
  public query func read(code : Nat32) : async ?Medicine {
    let result = Trie.find(medicines, key(code), Nat32.equal);
    return result;
  };
  // Function to retrieve all medicines.
  // public query func readAllMedicines() : async List.List<Medicine> {
  //   return Trie.fold(medicines, List.nil<Medicine>(), \(_, medicine, acc) -> medicine :: acc);
  // };
  //   public query func readSingle(code : Nat32) : async Text {
  //   let result = Trie.find(medicines, key(code), Nat32.equal);
  //   //1-> good to go, 2=>government
  //   let status = if(result.status == 2){
  //     return "Not for sale"
  //   }else{
  //     return "good to go"
  //   };
  //   // return status;
  // };


 




  // Function to validate (for testing).
  public query func validate(code: Text) : async Text {
    return "You entered the code " # code # "\n";  // Improved formatting
  };
};
