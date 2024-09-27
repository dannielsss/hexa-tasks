import LabelService from "../../Context/label/application/LabelService"
import ApiLabelRepository from "../../Context/label/infraestructure/ApiLabelRepository";

const labelRepository = new ApiLabelRepository();
const labelService = new LabelService(labelRepository);

export default function FilterView() {
  const findLabels = async () => await labelService.findAll();
  console.log(findLabels());

  return (
    <div>
      <p>Hello world</p>
      <button>Click here! </button>
    </div>
  )
}
