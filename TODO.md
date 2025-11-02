# TODO: Fix CGST, IGST, SGST GST Calculations

## Steps to Complete:
- [x] Add `igst` field to items state in Sales.jsx
- [ ] Update the table header to include IGST column
- [ ] Add IGST input field in the item row rendering
- [ ] Modify `handleItemChange` to calculate amount using IGST if present, else CGST+SGST, and handle taxType for exempt/nil/non-GST
- [ ] Make IGST mutually exclusive with CGST/SGST (clear CGST/SGST when IGST is entered, and vice versa)
- [ ] Update initial items array to include igst field
- [ ] Test the GST calculations for intra-state and inter-state scenarios
