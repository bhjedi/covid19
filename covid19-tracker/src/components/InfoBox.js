import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import './style/InfoBox.css';

function InfoBox({title,cases,total}) {
    return (
        <Card className='infoBox'>
            <CardContent>
                <Typography className='title'color='textSecondary'>
                    {title}
                </Typography>
                    <h2 className='cases'>{cases}</h2>
                    <Typography className='total' color='textSecondary'>
                    {total} Total
                    </Typography>


            </CardContent>
            
        </Card>
    )
}

export default InfoBox
