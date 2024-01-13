import List "mo:base/List";
import Option "mo:base/Option";
import Trie "mo:base/Trie";
import Nat32 "mo:base/Nat32";

actor Medical {
  // Set up storage.
  // The type of a medicine identifier.
  public type MedicineID = Nat32;

   // Create a trie key from a medicine identifier.
  private func key(x : MedicineID) : Trie.Key<MedicineID> {
    return { hash = x; key = x };
  };

  // The type of a Medicine.
  public type Medicine = {
    name : Text;
    code : Text;
    manufacturedDate : Text;  // Corrected spelling
    expiryDate : Text;
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
      key(medId),
      Nat32.equal,
      ?medicine,  // Use ? to indicate an Option type
    ).0;

    return medId;
  };

  // Function to greet (for testing).
  public query func greet(name : Text) : async Text {
    return "Hello, " # name # "!";
  };

  // Function to validate (for testing).
  public query func validate(code: Text) : async Text {
    return "You entered the code " # code # "\n";  // Improved formatting
  };
};
