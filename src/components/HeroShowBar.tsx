import { MobileLegendsCharacter } from '../API';

interface ClassicSearchBarProps {
  character: MobileLegendsCharacter;
}

export default function HeroShowBar({ character }: ClassicSearchBarProps) {

  // const formattedRole = character.role.replace("/", " ");

  return (
    <div className="flex gap-2">
      <div className="py-4 w-20 h-20 bg-green-500 border-white border-2 overflow-hidden flex justify-center items-center">Image</div>
      <div className="py-4 w-20 h-20 bg-green-500 border-white border-2 overflow-hidden flex justify-center items-center">{character.gender}</div>
      <div className="py-4 w-20 h-20 bg-green-500 border-white border-2 overflow-hidden flex justify-center items-center">{character.role}</div>
      <div className="py-4 w-20 h-20 bg-green-500 border-white border-2 overflow-hidden flex justify-center items-center">{character.lane?.replace("/", " ")}</div>
      <div className="text-sm py-4 w-20 h-20 bg-green-500 border-white border-2 overflow-hidden flex justify-center items-center">{character.region}</div>
      <div className="py-4 w-20 h-20 bg-green-500 border-white border-2 overflow-hidden flex justify-center items-center">{character.year?.toString()}</div>
    </div>
  );
}
