export default interface SeerUserId{
    seeUserId(id: number): Promise<boolean| null>;
}