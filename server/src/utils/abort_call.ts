import { ClientSession } from "mongoose";

async function abortCall(session: ClientSession) {
    await session.abortTransaction();
    await session.endSession();
}

export default abortCall;