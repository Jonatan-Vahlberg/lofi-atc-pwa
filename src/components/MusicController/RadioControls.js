
import { FaPlayCircle, FaPauseCircle, FaStepBackward, FaStepForward } from 'react-icons/fa';
import { useSettings } from '../../utils/context/SettingsContext';
import IconButton from '../IconButton';

const RadioControls = ({
    playState = "paused",
    togglePlayState = () => {},
    changeStation = (station, modifier) => {}
}) => {
    const settings = useSettings()
    return (
        <div>
            <div>
            <IconButton
                Icon={FaStepBackward}
                buttonProps={
                    {
                        onClick: () => changeStation(null, -1)
                }
                }
            />
            <IconButton
                Icon={playState === "paused" ? FaPlayCircle : FaPauseCircle}
                buttonProps={{
                    onClick: togglePlayState
                }}
            />
            <IconButton
                Icon={FaStepForward}
                buttonProps={
                    {
                        onClick: () => changeStation(null, 1)
                }
                }
            />
            </div>
        </div>
    )
}

export default RadioControls