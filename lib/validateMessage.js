export function validateMessage({message, senderName, isAnonymous, graduateDocumentId}) {
   const errors = {};

   const trimmedMessage = message.trim();
   const trimmedSenderName = senderName.trim();
   const trimmedGraduateDocumentId = graduateDocumentId.trim() || "";

   if (trimmedMessage.length < 10) {
      errors.message = "Message must be at least 10 characters long.";
   } else if (trimmedMessage.length > 500) {
        errors.message = "Message must be no more than 500 characters long.";
   }
   if (!isAnonymous && trimmedSenderName.length < 3) {
    errors.senderName = "Sender name is required.";
   }
   if (!trimmedGraduateDocumentId) {
    errors.graduateDocumentId = "Graduate document ID is required.";

   }
   return errors;
}