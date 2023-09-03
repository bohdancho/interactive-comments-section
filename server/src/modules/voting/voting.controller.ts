// export class VotingController<
//   D extends VotingDocument,
//   CreateDto extends CreateVotingDto,
//   UpdateDto extends UpdateVotingDto,
// > {
//   constructor(private service: VotingService<D, CreateDto, UpdateDto>) {}

//   async update(req: express.Request, res: express.Response) {
//     const objectId = new mongoose.Types.ObjectId(req.params.id)
//     const payload = <UpdateDto>req.body
//     try {
//       const item = await this.service.update(objectId, payload)
//       res.send(item)
//     } catch (error) {
//       res.status(400).send(error)
//     }
//   }
// }
