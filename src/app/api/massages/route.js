import {validateMessage} from "@/lib/validateMessage";

export async function POST(request) {
  try{
    const body = await request.json();
    const {message, senderName, isAnonymous, graduateDocumentId} = body;
    const errors = validateMessage({message, senderName, isAnonymous, graduateDocumentId});

    if (Object.keys(errors).length > 0) {
        return Response.json(
            {success: false, errors},
            {status: 400}
        )
    };
  

  return Response.json(
    {success: true, message: "Message sent successfully."},
    {status: 200},
  );
}catch (error) {
    return Response.json(
        {success:false , message: "error sending message."},
        {status: 500},
    )
}
}