import toast, { Toaster } from "react-hot-toast";
import Button from "./components/button";

export default function Demo() {
    const notify = () => toast.success("Hello, world!");
    const badnotify = () => toast.error("Hello, world!");

return (
    <>
    <Toaster />
    <h1>Hello, world!</h1>
    <Button onClick={notify}>Notify</Button>
    <br/>
    <Button onClick={badnotify}>BadNotify</Button>
    </>
);
}