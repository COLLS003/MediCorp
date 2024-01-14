export const idlFactory = ({ IDL }) => {
  const List = IDL.Rec();
  List.fill(IDL.Opt(IDL.Tuple(IDL.Text, List)));
  const Medicine = IDL.Record({
    'status' : IDL.Nat32,
    'usages' : List,
    'expiryDate' : IDL.Text,
    'code' : IDL.Nat32,
    'name' : IDL.Text,
    'manufacturedDate' : IDL.Text,
  });
  const MedicineID = IDL.Nat32;
  return IDL.Service({
    'createMedicine' : IDL.Func([Medicine], [MedicineID], []),
    'read' : IDL.Func([IDL.Nat32], [IDL.Opt(Medicine)], ['query']),
    'validate' : IDL.Func([IDL.Text], [IDL.Text], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
