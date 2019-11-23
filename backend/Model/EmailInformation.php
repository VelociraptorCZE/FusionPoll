<?php
/**
 * Fusion Poll
 * Copyright (c) Simon Raichl 2019
 * MIT License
 */
declare(strict_types=1);

namespace FusionPoll\Model;

class EmailInformation
{
    /** @var string */
    private $subject;

    /** @var string */
    private $to;

    /** @var string */
    private $from;

    public function __construct(array $emailInfo)
    {
        $this->subject = $emailInfo['subject'];
        $this->to = $emailInfo['to'];
        $this->from = $emailInfo['from'];
    }

    public function getSubject(): string
    {
        return $this->subject;
    }

    public function getTo(): string
    {
        return $this->to;
    }

    public function getFrom(): string
    {
        return $this->from;
    }
}